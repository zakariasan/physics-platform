from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from .User import User


def init_db(app):
    """ Init the data"""
    db.init_app(app)


__all__ = ['db', 'init_db', 'User']  # Add User to __all__
