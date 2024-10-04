# config

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///teacherApp.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'playUp'
    SESSION_COOKIE_NAME = 'session_id'
