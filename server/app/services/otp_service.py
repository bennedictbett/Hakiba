from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import generate_otp_code, hash_otp, verify_otp
from app.models.otp import OTPCode

MAX_ATTEMPTS = 5


def request_otp(phone_number: str, db: Session) -> str:
    """Creates a new OTP row and returns the raw code.
    In production this raw code goes to an SMS provider - it should never
    be returned in an API response. For now (no SMS provider wired up yet)
    we print it to the console so you can test the flow end to end."""
    code = generate_otp_code()

    otp_row = OTPCode(
        phone_number=phone_number,
        code_hash=hash_otp(code),
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES),
    )
    db.add(otp_row)
    db.commit()

    # TODO: replace with real SMS send (e.g. Africa's Talking) before going live
    print(f"[DEV ONLY] OTP for {phone_number}: {code}")

    return code


def verify_otp_code(phone_number: str, code: str, db: Session) -> bool:
    """Checks the most recent unused, unexpired OTP for this phone number."""
    otp_row = (
        db.query(OTPCode)
        .filter(OTPCode.phone_number == phone_number, OTPCode.used == False)  # noqa: E712
        .order_by(OTPCode.created_at.desc())
        .first()
    )

    if otp_row is None:
        return False

    if otp_row.attempts >= MAX_ATTEMPTS:
        return False

    if datetime.now(timezone.utc) > otp_row.expires_at.replace(tzinfo=timezone.utc):
        return False

    otp_row.attempts += 1

    if not verify_otp(code, otp_row.code_hash):
        db.commit()
        return False

    otp_row.used = True
    db.commit()
    return True