


from flask import Blueprint, Response, request
import logging
import requests
import os

webhook_bp = Blueprint("webhook_bp", __name__, url_prefix="/twilio")

@webhook_bp.route("/voice", methods=["POST"])
def twilio_voice():
    logging.info('=====twilio_voice route hit ======')

    from_number = request.form.get("From")
    to_number = request.form.get("To")
    call_id = request.args.get("call_id")

    logging.info(f"From: {from_number}, To: {to_number}, Call ID: {call_id}")

    payload = {
        "agent_id": os.getenv("ELEVENLABS_AGENT_ID"),
        "from_number": from_number,
        "to_number": to_number,
        "direction": "outbound"
    }

    headers = {
        "xi-api-key": os.getenv("ELEVENLABS_API_KEY"),
        "Content-Type": "application/json"
    }

    try:
        resp = requests.post(
            "https://api.elevenlabs.io/v1/convai/twilio/register-call",
            json=payload,
            headers=headers
        )
        logging.info("=============register call request sent=============")
        logging.info(f"ElevenLabs response: {resp.status_code} - {resp.text}")
        resp.raise_for_status()
        return Response(resp.text, content_type="application/xml")

    except Exception as e:
        logging.error(f"ElevenLabs error: {str(e)}")
        logging.error(f"Response body: {resp.text}")
        return Response(
            "<Response><Say>Sorry, AI assistant is unavailable.</Say></Response>",
            content_type="application/xml"
        )
@webhook_bp.route("/status", methods=["POST"])
def call_status():
    from app.models.call import Call
    from app import db

    call_id = request.args.get("call_id")
    status = request.form.get("CallStatus") # twilio generated statu like ringing,in-progress,completd,failed,no answer so we get all this status from twilio 
    duration = request.form.get("CallDuration", 0) # here the duration will get calulated

    logging.info(f"Call status update: call_id={call_id}, status={status}, duration={duration}")

    if call_id:
        call = Call.query.get(int(call_id)) # here it finds the call record in data base
        if call:
            call.status = status #updates the status
            call.duration = int(duration) # updates the duration

            db.session.commit()#it stores in db like when this commann runs the storing will happen
            logging.info(f"Call {call_id} updated to {status}")

    return "", 200