from flask import Flask
from models import db
from config import Config
from routes.courses import course_bp
from routes.auth import auth
from flask_cors import CORS  # Import Flask-CORS
from models import init_db
from flask_login import LoginManager
from models.User import User
app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)  # Enable CORS for the entire app
app.config['UPLOAD_FOLDER'] = './uploads'  # Set the upload folder path

# set up flask login`
login_manager = LoginManager()
login_manager.init_app(app)

init_db(app)
app.register_blueprint(course_bp)
app.register_blueprint(auth)

login_manager.login_view = 'auth.login'  # Set the login view
login_manager.login_message = "Please log in to access this page."
login_manager.login_message_category = "info"


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    return 'hello world'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)
