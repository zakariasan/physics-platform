# models/user.py
from datetime import datetime
from werkzeug.security import check_password_hash
from flask_login import UserMixin
from . import db


class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    data_created = db.Column(db.DateTime, default=datetime.utcnow)
    classes = db.relationship('ClassName', backref='teacher', lazy=True)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @staticmethod
    def get(user_id):
        return User.query.get(int(user_id))

    def __repr__(self):
        return '<User %r>' % self.username
