from app.db.base import Base
from app.db.session import engine

# Import every model so Base knows about them before create_all runs
from app.models import applicant, application, document, otp, staff_user  # noqa: F401

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")