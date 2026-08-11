import random
import string

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_phone
from app.db.session import get_db
from app.models.applicant import Applicant
from app.models.application import Application
from app.schemas.application import ApplicationCreate, ApplicationSubmittedResponse

router = APIRouter(prefix="/applications", tags=["applications"])


def generate_reference_number() -> str:
    """e.g. LN-7K2P9X - short, unique enough for this volume, easy to read over the phone."""
    suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"LN-{suffix}"


def get_or_create_applicant(phone_number: str, applicant_data, db: Session) -> Applicant:
    """Matches an existing applicant by phone (the JWT-verified identity),
    or creates one using the details submitted with this application."""
    applicant = db.query(Applicant).filter(Applicant.phone_number == phone_number).first()

    if applicant is None:
        applicant = Applicant(
            phone_number=phone_number,
            full_name=applicant_data.full_name,
            email=applicant_data.email,
            national_id_number=applicant_data.national_id_number,
        )
        db.add(applicant)
        db.flush()  # assigns applicant.id without committing yet
    else:
        # Keep the record current in case they've corrected a typo since last time
        applicant.full_name = applicant_data.full_name
        applicant.email = applicant_data.email
        applicant.national_id_number = applicant_data.national_id_number

    return applicant


@router.post("", response_model=ApplicationSubmittedResponse, status_code=status.HTTP_201_CREATED)
def submit_application(
    payload: ApplicationCreate,
    phone_number: str = Depends(get_current_phone),
    db: Session = Depends(get_db),
):
    applicant = get_or_create_applicant(phone_number, payload.applicant, db)

    reference_number = generate_reference_number()
    # Extremely unlikely to collide given the charset, but guard against it anyway
    while db.query(Application).filter(Application.reference_number == reference_number).first():
        reference_number = generate_reference_number()

    application = Application(
        reference_number=reference_number,
        applicant_id=applicant.id,
        loan_product=payload.loan_product,
        amount_requested=payload.amount_requested,
        purpose=payload.purpose,
        data_consent_given=payload.data_consent_given,
        terms_accepted=payload.terms_accepted,
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    # TODO: trigger staff notification here (email/Slack) once notification_service.py is built

    return ApplicationSubmittedResponse(
        reference_number=application.reference_number,
        status=application.status,
    )