from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.db.session import get_db
from app.core.security import create_access_token
from app.schemas.auth import OTPRequest, OTPVerify, TokenResponse
from app.services.otp_service import request_otp, verify_otp_code

router = APIRouter(prefix="/auth", tags=["auth"])
limiter = Limiter(key_func=get_remote_address)


@router.post("/otp/request", status_code=status.HTTP_200_OK)
@limiter.limit("3/minute")
def request_otp_endpoint(request: Request, payload: OTPRequest, db: Session = Depends(get_db)):
    request_otp(payload.phone_number, db)
    return {"message": "OTP sent"}


@router.post("/otp/verify", response_model=TokenResponse)
@limiter.limit("5/minute")
def verify_otp_endpoint(request: Request, payload: OTPVerify, db: Session = Depends(get_db)):
    is_valid = verify_otp_code(payload.phone_number, payload.code, db)
    if not is_valid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired OTP")

    token = create_access_token(subject=payload.phone_number)
    return TokenResponse(access_token=token)