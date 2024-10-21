# routes/className
from flask import Blueprint, request, jsonify
from flaskr.models import db
from flaskr.models.Course import ClassName
from flaskr.middleware.decorators import role_required
from flask_login import login_required, current_user
bp = Blueprint('class_name', __name__)


@bp.route('/creat_class', methods=['POST'])
@role_required(['Teacher'])
@login_required
def create_class():
    """ create a new class """
    data = request.get_json()
    name = data.get('className')
    if not name:
        return jsonify({'msg': 'Class name is required'}), 400

    if not current_user.is_authenticated:
        return jsonify({'msg': 'User not logged in try to login.'}), 401

    teacher_id = current_user.id
    new_class = ClassName(name=name, teacher_id=teacher_id)

    db.session.add(new_class)
    db.session.commit()
    return jsonify({'msg': 'Class created successfully'}), 201

# Get all Classes of the current_user


@bp.route('/get_classes', methods=['GET'])
@role_required(['Teacher'])
@login_required
def get_classes():
    """ get all classes """
    print(current_user.id, current_user.username, current_user.role)
    classes = current_user.classes
    class_list = [classe.as_dict() for classe in classes]
    return jsonify(class_list), 200

# Delete a class by id of the current_user


@bp.route('/delete_class/<int:class_id>', methods=['DELETE'])
@role_required(['teacher'])
@login_required
def delete_class(class_id):
    """ delete a class """
    class_to_delete = ClassName.query.filter_by(
        id=class_id,
        teacher_id=current_user.id
    ).first()

    if not class_to_delete:
        return jsonify({'msg': 'Class not found'}), 404

    db.session.delete(class_to_delete)
    db.session.commit()

    return jsonify({'msg': 'Class deleted successfully'}), 200

# Update a class name


@bp.route('/update_class/<int:class_id>', methods=['PUT'])
@role_required(['teacher'])
@login_required
def update_class(class_id):
    """ update a class """
    data = request.get_json()
    new_name = data.get('className')

    if not new_name:
        return jsonify({'msg': 'New class name is required'}), 400

    class_to_update = ClassName.query.filter_by(
        id=class_id, teacher_id=current_user.id).first()

    if not class_to_update:
        return jsonify({'msg': 'Class not found or unauthorized'}), 404

    class_to_update.name = new_name
    db.session.commit()

    return jsonify(
        {
            'msg': 'Class updated successfully',
            'class': class_to_update.as_dict()
        }), 200
