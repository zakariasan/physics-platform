# tests/test_auth.py
import unittest
from flaskr import create_app
from flaskr.models import User, db
from flaskr.config import TestConfig


class AuthTest(unittest.TestCase):
    """ test_auth testing authentication """

    def setUp(self):
        """ set up test env and db """
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

            user = User(
                username='testuser',
                email='test@test.com',
                role='Teacher',
                password='passwd123'
            )
            db.session.add(user)
            db.session.commit()

    def tearDown(self):
        """ clean Up after each test """
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_register(self):
        """ Test user registration """
        res = self.client.post('/register', json={
            'username': 'newUser',
            'password': 'passwd123'
        })

        self.assertEqual(res.status_code, 200)
