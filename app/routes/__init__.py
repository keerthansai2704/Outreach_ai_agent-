def register_routes(app):
    from .call_routes import call_bp
    from .webhook_routes import webhook_bp

    app.register_blueprint(call_bp)
    app.register_blueprint(webhook_bp)