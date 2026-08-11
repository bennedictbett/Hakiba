import uuid
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, Field, field_validator

from app.models.application import ApplicationStatus


class ApplicantCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=150)
    email: str | None = None
    national_id_number: str = Field(..., min_length=6, max_length=20)


class ApplicationCreate(BaseModel):
    applicant: ApplicantCreate
    loan_product: str = Field(..., max_length=100)
    amount_requested: Decimal = Field(..., gt=0)
    purpose: str | None = None
    data_consent_given: bool
    terms_accepted: bool

    @field_validator("data_consent_given", "terms_accepted")
    @classmethod
    def must_be_true(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consent and terms must be accepted to submit an application")
        return v


class ApplicationResponse(BaseModel):
    id: uuid.UUID
    reference_number: str
    loan_product: str
    amount_requested: Decimal
    status: ApplicationStatus
    created_at: datetime

    model_config = {"from_attributes": True}


class ApplicationSubmittedResponse(BaseModel):
    reference_number: str
    status: ApplicationStatus
    message: str = "Application received. We'll be in touch shortly."