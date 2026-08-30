import enum
import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, Numeric, Enum, ForeignKey, func, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ApplicationStatus(str, enum.Enum):
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    REJECTED = "rejected"
    SENT_TO_SERVICING = "sent_to_servicing"  # handed off to the client's existing system


class Application(Base):
    """A single loan application submitted by an applicant."""
    __tablename__ = "applications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reference_number: Mapped[str] = mapped_column(String(20), unique=True, nullable=False, index=True)

    applicant_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("applicants.id"), nullable=False)
    applicant: Mapped["Applicant"] = relationship(back_populates="applications")

    loan_product: Mapped[str] = mapped_column(String(100), nullable=False)  # e.g. "Quick Cash", "Business Loan"
    amount_requested: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    purpose: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(ApplicationStatus), default=ApplicationStatus.SUBMITTED, nullable=False
    )

    # Consent trail - required for Kenya's Data Protection Act compliance
    data_consent_given: Mapped[bool] = mapped_column(default=False, nullable=False)
    terms_accepted: Mapped[bool] = mapped_column(default=False, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    documents: Mapped[list["Document"]] = relationship(back_populates="application", cascade="all, delete-orphan")