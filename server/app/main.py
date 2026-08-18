import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address


from app.core.config import settings
from app import models  # noqa: F401
from app.api.routes import auth, applications
from app.api.routes import auth, applications, admin

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s: %(message)s")

app = FastAPI(title="Loan Platform API")

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(applications.router)
app.include_router(admin.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "loan-platform-api"}