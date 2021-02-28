import os
from flask import Flask, request, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

mysql_username = os.environ['MYSQL_USER']
mysql_password = os.environ['MYSQL_PASSWORD']
mysql_host = os.environ['MYSQL_HOST']
mysql_port = os.environ['MYSQL_PORT']
mysql_db = os.environ['MYSQL_DATABASE']

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + mysql_username + ':' \
    + mysql_password + '@' + mysql_host + ':' + mysql_port + '/' + mysql_db
db = SQLAlchemy(app)
ma = Marshmallow(app)

from models import product, image
db.create_all()

from routes import product

from functools import wraps
def token_required(controller_function):
    @wraps(controller_function)
    def wrapper_function(*args, **kwargs):
        # Make endpoint in the Auth Service to validate an Auth Token
        # The endpoint will return details such as User's Account ID
        auth_token = request.headers.get('authorization', '')
        user = request.get(os.environ['AUTH_MICROSERVICE_ADDRESS'], headers={'AuthToken': auth_token})
        # If the Response Json has an account_id which is not empty, the user is valid
        if user:
            controller_function(user, *args, **kwargs)
        else:
            # You can also redirect the user to the login page.
            abort(403, 'Invalid user')