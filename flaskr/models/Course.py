# models/Course.py
from datetime import datetime
from flaskr.models import db


class ClassName(db.Model):
    __tablename__ = 'className'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    courses = db.relationship('Course', backref='className', lazy=True)
    teacher_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'teacher_id': self.teacher_id
        }


class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    unite_name = db.Column(db.String(200), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(
        'className.id'), nullable=False)
    teacher_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    teacher = db.relationship('User', backref=db.backref('courses', lazy=True))
    lessons = db.relationship('Lesson', backref='course', lazy=True)

    def __repr__(self):
        return '<Course %r>' % self.name


class Lesson(db.Model):
    __tablename__ = 'lesson'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(
        'courses.id'), nullable=False)
    teacher_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    exercise_file = db.Column(db.String(255), nullable=True)
    lesson_file = db.Column(db.String(255), nullable=True)
    pedagogical_file = db.Column(db.String(255), nullable=True)
