# routes/c
import os
from flask import Blueprint, request, jsonify, current_app
from flaskr.models import db
from flaskr.models.Course import Course, Lesson
from flaskr.middleware.decorators import role_required
from werkzeug.utils import secure_filename
from flask_login import login_required, current_user
bp = Blueprint('courses', __name__)

###
# @course_bp.route('/dashboard', methods=['GET'])
# @login_required
# def dashboard():
#    return jsonify({'msg': f'Welcome {current_user.username}'})


# Create Course
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt'}


def allowed_file(filename):
    """ allowed files in our server """
    return '.' in filename and filename\
        .rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@bp.route('/create_course', methods=['POST'])
def create_course():
    """ Creat course """
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


@bp.route('/courses', methods=['GET'])
def get_courses():
    """ Get all courses of the current User """
    courses = Course.query.all()
    return jsonify([course.as_dict() for course in courses]), 200


@bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    """ get one Course by the User """
    course = Course.query.get_or_404(course_id)
    return jsonify(course.as_dict()), 200


@bp.route('/courses/<int:course_id>', methods=['PUT'])
@ role_required(['teacher'])
def update_course(course_id):
    """ Update a course by the User """
    data = request.get_json()
    course = Course.query.get_or_404(course_id)

    course.title = data.get('title', course.title)
    course.description = data.get('description', course.description)
    course.teacher_id = data.get('teacher_id', course.teacher_id)

    db.session.commit()
    return jsonify({'msg': 'Course updated successfully'}), 200


@bp.route('/courses/<int:course_id>', methods=['DELETE'])
@ role_required(['teacher'])
def delete_course(course_id):
    """ Delete a course """
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'msg': 'Course deleted successfully'}), 200
