# config

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///teacher_student.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'playUp'
    SESSION_COOKIE_NAME = 'session_id'


class TestConfig(Config):
    """ Configuration for testing. """
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SESSION_COOKIE_NAME = 'test_session'
