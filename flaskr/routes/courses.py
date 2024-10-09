# routes/c
import os
from flask import Blueprint, request, jsonify, current_app
from models import db
from models.Course import Course
from models.Course import Lesson
from models.Course import ClassName
from middleware.decorators import role_required
from werkzeug.utils import secure_filename
from flask_login import login_required, current_user
course_bp = Blueprint('courses', __name__)

###
# @course_bp.route('/dashboard', methods=['GET'])
# @login_required
# def dashboard():
#    return jsonify({'msg': f'Welcome {current_user.username}'})


@course_bp.route('/profile', methods=['GET'])
@login_required
def profile():
    return jsonify({
        'username': current_user.username,
        'email': current_user.email,
        'role': current_user.role
    })


@course_bp.route('/creat_class', methods=['POST'])
@login_required
def create_class():
    data = request.get_json()
    name = data.get('className')
    if not name:
        return jsonify({'msg': 'undefined class add One'})
    if current_user.is_authenticated:
        teacher_id = current_user.id
    else:
        return jsonify({'msg': 'not logged in babyy'})

    new_class = ClassName(name=name, teacher_id=teacher_id)
    db.session.add(new_class)
    db.session.commit()
    return jsonify({'msg': 'Class created successfully'}), 201


@course_bp.route('/get_classes', methods=['GET'])
@login_required
def get_classes():
    classes = current_user.classes
    class_list = [classe.as_dict() for classe in classes]
    return jsonify(class_list), 200


# Create Course
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt'}


def allowed_file(filename):
    return '.' in filename and filename\
        .rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@ course_bp.route('/create_course', methods=['POST'])
def create_course():

    if current_user.is_authenticated:
        teacher_id = current_user.id
    else:
        return jsonify({'msg': 'not logged in please register'})

    data = request.form
    files = request.files

    unite_name = data.get('unite_name')
    title = data.get('title')
    class_id = data.get('className')

    required_fields = ['unite_name', 'title', 'className']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing data fields.'}), 400

    new_course = Course(
        unite_name=unite_name,
        class_id=class_id,
        teacher_id=teacher_id
    )

    db.session.add(new_course)
    db.session.flush()

    new_lesson = Lesson(
        title=title,
        course_id=new_course.id,
        teacher_id=teacher_id
    )

    db.session.add(new_lesson)
    db.session.flush()

    file_fields = ['lesson_file', 'pedagogical_file', 'exercise_file']

    # Build the path for the course folder
    upload_path = os.path.join(
        current_app.config['UPLOAD_FOLDER'], f"course_{new_course.id}")

    # Ensure the directory exists
    os.makedirs(upload_path, exist_ok=True)
    # creating folder
    for field in file_fields:
        file = files.get(field)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(upload_path, filename)
            file.save(filepath)
            setattr(new_lesson, field, filepath)

    try:
        db.session.commit()
        return jsonify({
            'msg': 'Course and lesson created successfully',
            'course_id': new_course.id,
            'lesson_id': new_lesson.id
        }), 201
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error creating course: {str(e)}")
        return jsonify({
            'error': 'An error occurred while creating the course'
        }), 500


@ course_bp.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([course.as_dict() for course in courses]), 200


@ course_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify(course.as_dict()), 200


@ course_bp.route('/courses/<int:course_id>', methods=['PUT'])
@ role_required(['teacher'])
def update_course(course_id):
    data = request.get_json()
    course = Course.query.get_or_404(course_id)

    course.title = data.get('title', course.title)
    course.description = data.get('description', course.description)
    course.teacher_id = data.get('teacher_id', course.teacher_id)

    db.session.commit()
    return jsonify({'msg': 'Course updated successfully'}), 200


@ course_bp.route('/courses/<int:course_id>', methods=['DELETE'])
@ role_required(['teacher'])
def delete_course(course_id):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'msg': 'Course deleted successfully'}), 200
