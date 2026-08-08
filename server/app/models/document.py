import enum
import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, Enum, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DocumentType(str, enum.Enum):
    NATIONAL_ID_FRONT = "national_id_front"
    NATIONAL_ID_BACK = "national_id_back"
    PASSPORT_PHOTO = "passport_photo"
    MPESA_STATEMENT = "mpesa_statement"
    PROOF_OF_INCOME = "proof_of_income"
    OTHER = "other"


class Document(Base):
    """A file uploaded as part of an application. Only the S3 key is stored here,
    never the file bytes - keeps the DB light and storage swappable."""
    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    application_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("applications.id"), nullable=False)
    application: Mapped["Application"] = relationship(back_populates="documents")

    document_type: Mapped[DocumentType] = mapped_column(Enum(DocumentType), nullable=False)
    storage_key: Mapped[str] = mapped_column(String(500), nullable=False)  # S3/R2 object key
    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)

    uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())