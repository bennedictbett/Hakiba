from pydantic import BaseModel, EmailStr


class StaffLogin(BaseModel):
    email: EmailStr
    password: str


class StaffTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    full_name: str
    role: str