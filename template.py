import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='[%(asctime)s]: %(message)s')

project_name = "loan_platform"

list_of_files = [
    # --- server: core ---
    "server/app/__init__.py",
    "server/app/main.py",
    "server/app/core/__init__.py",
    "server/app/core/config.py",
    "server/app/core/security.py",

    # --- server: db ---
    "server/app/db/__init__.py",
    "server/app/db/base.py",
    "server/app/db/session.py",

    # --- server: models ---
    "server/app/models/__init__.py",
    "server/app/models/applicant.py",
    "server/app/models/application.py",
    "server/app/models/document.py",
    "server/app/models/otp.py",
    "server/app/models/staff_user.py",

    # --- server: schemas ---
    "server/app/schemas/__init__.py",
    "server/app/schemas/auth.py",
    "server/app/schemas/application.py",

    # --- server: api routes ---
    "server/app/api/__init__.py",
    "server/app/api/deps.py",
    "server/app/api/routes/__init__.py",
    "server/app/api/routes/auth.py",
    "server/app/api/routes/applications.py",
    "server/app/api/routes/admin.py",

    # --- server: services ---
    "server/app/services/__init__.py",
    "server/app/services/otp_service.py",
    "server/app/services/notification_service.py",
    "server/app/services/storage_service.py",

    # --- server: migrations, config, root files ---
    "server/alembic/.gitkeep",
    "server/alembic.ini",
    "server/create_tables.py",
    "server/requirements.txt",
    "server/.env.example",
    "server/README.md",

    # --- client: app router pages ---
    "client/app/layout.tsx",
    "client/app/globals.css",
    "client/app/(marketing)/page.tsx",
    "client/app/(marketing)/products/page.tsx",
    "client/app/(marketing)/about/page.tsx",
    "client/app/(marketing)/faq/page.tsx",
    "client/app/(application)/login/page.tsx",
    "client/app/(application)/verify/page.tsx",
    "client/app/(application)/apply/page.tsx",
    "client/app/(application)/confirmation/page.tsx",
    "client/app/(admin)/dashboard/page.tsx",

    # --- client: components ---
    "client/components/.gitkeep",

    # --- client: lib + store ---
    "client/lib/api.ts",
    "client/store/.gitkeep",

    # --- client: config/root files ---
    "client/package.json",
    "client/next.config.js",
    "client/tailwind.config.ts",
    "client/tsconfig.json",
    "client/.env.local.example",

    # --- root ---
    "README.md",
]

for filepath in list_of_files:
    filepath = Path(filepath)
    filedir, filename = os.path.split(filepath)

    if filedir != "":
        os.makedirs(filedir, exist_ok=True)
        logging.info(f"Creating directory: {filedir} for the file: {filename}")

    if (not os.path.exists(filepath)) or (os.path.getsize(filepath) == 0):
        with open(filepath, "w") as f:
            pass
        logging.info(f"Creating empty file: {filepath}")
    else:
        logging.info(f"{filename} already exists")

logging.info("Project structure created successfully!")