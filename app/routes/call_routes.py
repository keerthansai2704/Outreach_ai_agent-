from flask import Blueprint, request, jsonify
from app.models.call import Call
from app.services.call_services import initiate_outbound_call
from app import db
import logging

call_bp = Blueprint("call_bp", __name__, url_prefix="/calls")


@call_bp.route("", methods=["POST"])
def create_call():
    logging.info('=========create_call route hit==========')
    """
    Create an outbound call.
    Expected JSON:
    {
        "phone_number": "+91XXXXXXXXXX"
    }
    """

    data = request.get_json()
    logging.info(data)

    if not data or "phone_number" not in data:
        return jsonify({"error": "phone_number is required"}), 400

    phone_number = data["phone_number"]

    try:
        
        # Create initial DB record
        new_call = Call(phone_number=phone_number)
        db.session.add(new_call)
        db.session.commit()

        # Trigger Twilio call via service layer
        twilio_sid = initiate_outbound_call(phone_number, new_call.id)

        # Update record with Twilio SID
        new_call.twilio_sid = twilio_sid
        db.session.commit()

        return jsonify({
            "message": "Call initiated successfully",
            "call": new_call.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@call_bp.route("", methods=["GET"])
def list_calls():
    """
    Fetch all call records
    """
    calls = Call.query.order_by(Call.created_at.desc()).all()
    return jsonify([call.to_dict() for call in calls]), 200