# middleware/decorators.py

from functools import wraps
from flask_login import current_user
from flask import jsonify


def role_required(roles):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            if current_user.role not in roles:
                return jsonify({'msg': 'Access forbidden'}), 403
            return f(*args, **kwargs)
        return wrapped
    return wrapper
