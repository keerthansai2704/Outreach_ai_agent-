from flask import Blueprint, Response
import logging

webhook_bp = Blueprint("webhook_bp", __name__, url_prefix="/twilio")


@webhook_bp.route("/voice", methods=["POST"])
def twilio_voice():
    logging.info('=====twilio_voice route hit ======')
    """
    Twilio will hit this endpoint when the call connects.
    """

    response_xml = """
    <Response>
        <Say>Hello. This is your AI call system.</Say>
    </Response>
    """

    return Response(response_xml.strip(), mimetype="text/xml")