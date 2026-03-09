from twilio.rest import Client
from flask import current_app
import logging


def initiate_outbound_call(phone_number, call_id):
    logging.info('====outbount call hit ==========')
    """
    Create an outbound call using Twilio
    """

    # Get configuration values
    account_sid = current_app.config["TWILIO_ACCOUNT_SID"]
    auth_token = current_app.config["TWILIO_AUTH_TOKEN"]
    from_number = current_app.config["TWILIO_PHONE_NUMBER"]
    base_url = current_app.config["BASE_URL"]

    # Create Twilio client
    client = Client(account_sid, auth_token)

    # Webhook URL (Twilio will call this when call connects)
    voice_url = f"{base_url}/twilio/voice?call_id={call_id}"
    status_url = f"{base_url}/twilio/status?call_id={call_id}" 

    logging.info(f"Voice URL being sent to Twilio: {voice_url},{status_url}")

    # Make outbound call
    call = client.calls.create(
        to=phone_number,
        from_=from_number,
        url=voice_url,
        status_callback=status_url,
        status_callback_event=["initiated", "ringing", "answered", "completed", "busy", "no-answer", "failed"],
        status_callback_method="POST"
    )

    # Return Twilio Call SID
    return call.sid