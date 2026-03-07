# from flask import Blueprint, Response, request
# import logging

# webhook_bp = Blueprint("webhook_bp", __name__, url_prefix="/twilio")


# @webhook_bp.route("/voice", methods=["POST"])
# def twilio_voice():
#     logging.info('=====twilio_voice route hit ======')
#     call_id =request.args.get("call_id","unknown")

#     host = request.host
#     response_xml = f"""<?xml version="1.0" encoding = "UTF-8"?>
#     <Response><Say>Hello. This is your AI call system.</Say>
#     <connect>
#         <stream url ="was://{host}/twilio/stream/{call_id}" />
#     </connect>
#     </Response>
#     """

#     return Response(response_xml.strip(), mimetype="text/xml")



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
        resp.raise_for_status()
        logging.info("ElevenLabs register-call success")
        return Response(resp.text, content_type="application/xml")

    except Exception as e:
        logging.error(f"ElevenLabs error: {str(e)}")
        return Response(
            "<Response><Say>Sorry, AI assistant is unavailable.</Say></Response>",
            content_type="application/xml"
        )
