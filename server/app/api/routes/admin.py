from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_current_staff
from app.core.security import create_access_token, verify_password
from app.db.session import get_db
from app.models.application import Application
from app.models.staff_user import StaffUser
from app.schemas.admin import StaffLogin, StaffTokenResponse
from app.schemas.application import ApplicationResponse

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/login", response_model=StaffTokenResponse)
def staff_login(payload: StaffLogin, db: Session = Depends(get_db)):
    staff = db.query(StaffUser).filter(StaffUser.email == payload.email).first()

    if staff is None or not verify_password(payload.password, staff.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token(subject=str(staff.id), extra_claims={"role": "staff"})
    return StaffTokenResponse(access_token=token, full_name=staff.full_name, role=staff.role.value)


@router.get("/applications", response_model=list[ApplicationResponse])
def list_applications(
    staff_id: str = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    applications = (
        db.query(Application)
        .options(joinedload(Application.applicant))
        .order_by(Application.created_at.desc())
        .all()
    )
    return applications