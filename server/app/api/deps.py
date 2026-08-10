from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError

from app.core.security import decode_access_token

bearer_scheme = HTTPBearer()


def get_current_phone(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> str:
    """Extracts and validates the phone number from a Bearer JWT.
    Used to protect any route that requires a verified applicant."""
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    phone_number = payload.get("sub")
    if phone_number is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    return phone_number