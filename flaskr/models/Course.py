# models/Course.py
from datetime import datetime
from flaskr.models import db


class ClassName(db.Model):
    __tablename__ = 'class_name'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    courses = db.relationship('Course', backref='class_name', lazy=True)
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
    domaine = db.Column(db.String(200), nullable=False)
    unite_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    level = db.Column(db.String(200), nullable=False)
    teacher_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id'),
        nullable=False
    )
    className = db.Column(db.Integer, db.ForeignKey('class_name.id'))
#    className = db.relationship("ClassName", back_populates="courses")
    teacher = db.relationship('User', backref=db.backref('courses', lazy=True))
    lessons = db.relationship('Lesson', backref='courses', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Course %r>' % self.name

    def as_dict(self):
        return {
            'id': self.id,
            'domaine': self.domaine,
            'unite_name': self.unite_name,
            'description': self.description,
            'level': self.level,
            'created_at': self.created_at,
            'lessons': [lesson.as_dict() for lesson in self.lessons]
        }


class Lesson(db.Model):
    __tablename__ = 'lesson'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    lesson_type = db.Column(db.String(200), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(
        'courses.id'), nullable=False)
    teacher_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    file = db.Column(db.String(255), nullable=True)

    def as_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'lesson_type': self.lesson_type,
            'course_id': self.course_id,
            'created_at': self.created_at,
            'file': self.file
        }
