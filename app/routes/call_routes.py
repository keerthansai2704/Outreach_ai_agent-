from flask import Blueprint, request, jsonify
from app.models.call import Call
from app.services.call_services import initiate_outbound_call
from app.utils.auth import verify_token
from app import db
import logging

call_bp = Blueprint("call_bp", __name__, url_prefix="/calls")


@call_bp.route("", methods=["POST"])
@verify_token
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
    name =data.get("name","Unknown")

    try:
        
        # Create initial DB record
        new_call = Call(phone_number=phone_number,
                        name=name,
                        user_id=request.user_id

                        )
        db.session.add(new_call) # new call record will be craeted and session will be added
        db.session.commit() # saves the data to postgresql

        # Trigger Twilio call via service layer
        twilio_sid = initiate_outbound_call(phone_number, new_call.id)
        logging.info(f"new call {new_call}")

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
@verify_token
def list_calls():
    """
    Fetch all call records
    """
    calls = Call.query.filter_by(user_id=request.user_id)\
        .order_by(Call.created_at.desc()).all()
    return jsonify([c.to_dict() for c in calls]), 200