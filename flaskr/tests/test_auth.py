# tests/test_auth.py
import unittest
from flaskr import create_app
from flaskr.models import User, db
from flaskr.config import TestConfig
from werkzeug.security import generate_password_hash


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
                password=generate_password_hash('passwd123')

            )
            db.session.add(user)
            db.session.commit()
            print(user)

    def tearDown(self):
        """ clean Up after each test """
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_register(self):
        """ Test user registration """

        user1 = self.client.post('/register', json={
            'username': 'newUser',
            'email': 'newUser@gmail.com',
            'role': 'Teacher',
            'password': 'passwd123'
        })

        self.assertEqual(user1.status_code, 201)
        self.assertIn('User created successfully', user1.get_json()['msg'])

        """ Testing exsting user """
        user2 = self.client.post('/register', json={
            'username': 'testuser',
            'email': 'test@test.com',
            'role': 'Teacher',
            'password': 'passwd123'
        })
        self.assertEqual(user2.status_code, 409)
        self.assertIn('User already exists', user2.get_json()['msg'])

    def test_login(self):
        """ Test user Login """
        user1 = self.client.post('/login', json={
            'username': 'testuser',
            'password': 'passwd123'
        })

        self.assertEqual(user1.status_code, 200)
