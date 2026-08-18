"""
Creates a staff user. Run once per staff account you need to bootstrap.
    python -m create_staff
"""
import getpass

from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.staff_user import StaffUser, StaffRole

if __name__ == "__main__":
    db = SessionLocal()

    email = input("Staff email: ").strip()
    full_name = input("Full name: ").strip()
    password = getpass.getpass("Password: ")

    existing = db.query(StaffUser).filter(StaffUser.email == email).first()
    if existing:
        print(f"A staff account with email {email} already exists.")
    else:
        staff = StaffUser(
            email=email,
            full_name=full_name,
            hashed_password=hash_password(password),
            role=StaffRole.ADMIN,
        )
        db.add(staff)
        db.commit()
        print(f"Staff account created: {full_name} ({email})")

    db.close()