import logging

import httpx

from app.core.config import settings
from app.models.applicant import Applicant
from app.models.application import Application

logger = logging.getLogger(__name__)


def _send_email(application: Application, applicant: Applicant) -> None:
    """Sends a staff notification email via Resend.
    Silently no-ops if Resend isn't configured yet - lets you develop
    without needing every third-party service wired up from day one."""
    if not settings.RESEND_API_KEY or not settings.STAFF_NOTIFICATION_EMAIL:
        logger.info("[Notifications] Resend not configured - skipping email notification.")
        return

    subject = f"New loan application: {application.reference_number}"
    body = (
        f"<h2>New application received</h2>"
        f"<p><strong>Reference:</strong> {application.reference_number}</p>"
        f"<p><strong>Applicant:</strong> {applicant.full_name} ({applicant.phone_number})</p>"
        f"<p><strong>Product:</strong> {application.loan_product}</p>"
        f"<p><strong>Amount requested:</strong> KES {application.amount_requested:,.0f}</p>"
        f"<p><strong>Purpose:</strong> {application.purpose or 'Not specified'}</p>"
    )

    try:
        response = httpx.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
            json={
                "from": settings.NOTIFY_EMAIL_FROM or "onboarding@resend.dev",
                "to": [settings.STAFF_NOTIFICATION_EMAIL],
                "subject": subject,
                "html": body,
            },
            timeout=10.0,
        )
        response.raise_for_status()
        logger.info(f"[Notifications] Email sent for {application.reference_number}")
    except httpx.HTTPError as e:
        # A notification failure should never break the application flow -
        # the application is already saved in the DB regardless of this succeeding.
        logger.error(f"[Notifications] Failed to send email for {application.reference_number}: {e}")


def _send_slack(application: Application, applicant: Applicant) -> None:
    """Sends a staff notification to Slack via incoming webhook. Same no-op-if-unconfigured pattern."""
    if not settings.SLACK_WEBHOOK_URL:
        logger.info("[Notifications] Slack webhook not configured - skipping Slack notification.")
        return

    message = (
        f"*New loan application* — `{application.reference_number}`\n"
        f"Applicant: {applicant.full_name} ({applicant.phone_number})\n"
        f"Product: {application.loan_product} — KES {application.amount_requested:,.0f}"
    )

    try:
        response = httpx.post(settings.SLACK_WEBHOOK_URL, json={"text": message}, timeout=10.0)
        response.raise_for_status()
        logger.info(f"[Notifications] Slack message sent for {application.reference_number}")
    except httpx.HTTPError as e:
        logger.error(f"[Notifications] Failed to send Slack message for {application.reference_number}: {e}")


def notify_new_application(application: Application, applicant: Applicant) -> None:
    """Fires both notification channels. Each is independently fault-tolerant -
    one failing never affects the other or the application that's already saved."""
    _send_email(application, applicant)
    _send_slack(application, applicant)