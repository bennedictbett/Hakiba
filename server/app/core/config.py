from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # JWT
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 43200  # 30 days

    # OTP
    OTP_EXPIRE_MINUTES: int = 5

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    # File storage
    S3_ENDPOINT_URL: str = ""
    S3_ACCESS_KEY: str = ""
    S3_SECRET_KEY: str = ""
    S3_BUCKET_NAME: str = "loan-platform-documents"

    # Notifications
    NOTIFY_EMAIL_FROM: str = ""
    RESEND_API_KEY: str = ""
    SLACK_WEBHOOK_URL: str = ""

    # SMS
    SMS_API_KEY: str = ""
    SMS_USERNAME: str = ""

    @property
    def allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()