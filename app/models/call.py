from datetime import datetime
from app import db

class Call(db.Model):
    __tablename__ = "calls"

    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(20), nullable=False)
    twilio_sid = db.Column(db.String(100))
    status = db.Column(db.String(50), default="initiated")
    duration = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(IST))

    def to_dict(self):
        return {
            "id": self.id,
            "phone_number": self.phone_number,
            "twilio_sid": self.twilio_sid,
            "status": self.status,
            "duration": self.duration,
            "created_at": self.created_at.isoformat()
        }