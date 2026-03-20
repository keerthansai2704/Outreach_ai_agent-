# 
import logging
from app import create_app, db

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

app = create_app()

@app.route("/")
def home():
    return "Outreach AI Agent is running! 🚀", 200

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    logging.info("Starting Flask server...")
    app.run(host='0.0.0.0', port=8090, debug=True)


