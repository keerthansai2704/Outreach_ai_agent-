# from app import create_app, db

# app = create_app()

# with app.app_context():
#     db.create_all()

# if __name__ == "__main__":
#     app.run(port=8090, debug=True)

import logging
from app import create_app, db

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    logging.info("Starting Flask server...")
    app.run(port=8090, debug=True)