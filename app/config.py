import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///calls.db")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")

    # Database
    SQLALCHEMY_DATABASE_URI =DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Twilio
    TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
    
    TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
   
    TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
   
    ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
   
    # Public base URL (ngrok)
    BASE_URL = os.getenv("BASE_URL")