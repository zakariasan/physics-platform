# routes/user_routes

from models import db
from flask import Blueprint, request, jsonify, session, url_for, redirect
from models.User import User
from werkzeug.security import generate_password_hash
from flask_login import login_user, logout_user, login_required, current_user
auth = Blueprint('auth', __name__)


@auth.route('/check_auth')
def check_auth():
    if current_user.is_authenticated:
        return jsonify(user={"username": current_user.username, "email": current_user.email})
    return jsonify(user=None), 401


@auth.route('/register', methods=['POST', 'GET'])
def register():
    # register logic
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    role = data.get('role')
    password = data.get('password')

    if not username or not email or not password or not role:
        return jsonify({'msg': 'Missing infos'}), 400

    # check if user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return ({'msg': 'User already exists'}), 400

    # create a new one
    hash_pass = generate_password_hash(password)
    new_user = User(username=username, email=email,
                    password=hash_pass, role=role)
    # hashing passwd here

    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        'msg': 'User created successfully',
        'redirect_url': '/login'
    }), 201


@auth.route('/login', methods=['POST'])
def login():
    # login logic part
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'msg': 'Missing infos'}), 400
    # check if user already exists
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({
            'msg': 'login successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            },
            'redirect_url': '/dashboard'}), 200

    return ({'msg': 'Invalide User'}), 401


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    # logout logi
    logout_user()
    return ({'msg': 'Logout successfully'}), 200
