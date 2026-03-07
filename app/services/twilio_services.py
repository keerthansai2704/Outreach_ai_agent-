import logging
from twilio.rest import Client
from flask import current_app


def make_outbound_call(phone_number: str, call_id: int) -> str:
    """
    Initiates an outbound call using Twilio.
    """

    logging.info("=== Twilio Service Triggered ===")
    logging.info(f"Phone Number: {phone_number}")
    logging.info(f"Call ID: {call_id}")

    # Load configuration safely
    account_sid = current_app.config.get("TWILIO_ACCOUNT_SID")
    auth_token = current_app.config.get("TWILIO_AUTH_TOKEN")
    from_number = current_app.config.get("TWILIO_PHONE_NUMBER")
    base_url = current_app.config.get("BASE_URL")

    if not all([account_sid, auth_token, from_number, base_url]):
        logging.error("Twilio configuration missing")
        raise ValueError("Twilio configuration missing")

    # Never log full secrets
    logging.info(f"Using Twilio SID: {account_sid[:6]}****")

    try:
        client = Client(account_sid, auth_token)

        voice_url = f"{base_url}/twilio/voice?call_id={call_id}"
        logging.info(f"Voice URL being sent to Twilio: {voice_url}")

        call = client.calls.create(
            to=phone_number,
            from_=from_number,
            url=voice_url
        )

        logging.info(f"Twilio Call SID: {call.sid}")
        return call.sid

    except Exception as e:
        logging.error(f"Twilio API Error: {str(e)}")
        raise