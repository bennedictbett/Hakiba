from pydantic import BaseModel, Field, field_validator


class OTPRequest(BaseModel):
    phone_number: str = Field(..., min_length=10, max_length=13)

    @field_validator("phone_number")
    @classmethod
    def normalize_phone(cls, v: str) -> str:
        v = v.strip().replace(" ", "")
        if v.startswith("0"):
            v = "+254" + v[1:]
        elif v.startswith("254"):
            v = "+" + v
        if not v.startswith("+254"):
            raise ValueError("Phone number must be a valid Kenyan number")
        return v


class OTPVerify(BaseModel):
    phone_number: str
    code: str = Field(..., min_length=6, max_length=6)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"