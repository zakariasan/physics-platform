# conftest.py
import pytest

from flaskr.app import create_app  # Import your Flask app factory
from flaskr.models import db


@pytest.fixture
def client():
    """Fixture to set up a test client."""
    app = create_app(config_class='flaskr.config.TestingConfig')
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()
