from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app,resources={r"/*":{"origins":"*"}})

    # Register routes later
    from .routes import register_routes
    register_routes(app)

    return app