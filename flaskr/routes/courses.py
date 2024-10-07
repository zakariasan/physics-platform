# routes/c
from flask import Blueprint, request, jsonify, session
from models import db
from models.Course import Course
from models.Course import ClassName
from middleware.decorators import role_required
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
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@ course_bp.route('/create_course', methods=['POST'])
@login_required
@ role_required(['teacher'])
def create_course():

    if current_user.is_authenticated:
        teacher_id = current_user.id
    else:
        return jsonify({'msg': 'not logged in babyy'})

    data = request.form
    files = request.files

    unite_name = data.get('unite_name')
    title = data.get('title')
    class_id = data.get('className')

    # Handle file uploads
    lesson_file = files.get('lesson_file')
    pedagogical_file = files.get('pedagogical_file')
    exercise_file = files.get('exercise_file')

    if not unite_name or not title or not class_id:
        return jsonify({'error': 'Missing data fields.'}), 400

    new_course = Course(
        unite_name=unite_name,
        class_id=class_id,
        teacher_id=teacher_id
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({'msg': 'Course created successfully'}), 201


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
