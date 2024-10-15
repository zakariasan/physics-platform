# init
# flaskr/__init__.py

from flaskr.models import db, init_db, User
from flask_cors import CORS
from flask import Flask
from .config import Config
from flask_login import LoginManager
login_manager = LoginManager()


def create_app(config_class=Config):
    """Application Factory: Creates and configures the Flask app."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS and set upload folder
    CORS(app, supports_credentials=True)
    app.config['UPLOAD_FOLDER'] = './uploads'
    # Initialize extensions
    init_db(app)
    login_manager.init_app(app)

    # Register blueprints
    from .routes import auth_bp, courses_bp, class_name_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(class_name_bp)

    # Configure Flask-Login
    login_manager.login_view = 'auth.login'
    login_manager.login_message = "Please log in to access this page."
    login_manager.login_message_category = "info"

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    with app.app_context():
        db.create_all()

    return app
