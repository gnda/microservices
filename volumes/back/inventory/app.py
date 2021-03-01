import os
import requests
from flask import Flask, request, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from functools import wraps

mysql_username = os.environ['MYSQL_USER']
mysql_password = os.environ['MYSQL_PASSWORD']
mysql_host = os.environ['MYSQL_HOST']
mysql_port = os.environ['MYSQL_PORT']
mysql_db = os.environ['MYSQL_DATABASE']

app = Flask(__name__)
CORS(app)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + mysql_username + ':' \
    + mysql_password + '@' + mysql_host + ':' + mysql_port + '/' + mysql_db
db = SQLAlchemy(app)
ma = Marshmallow(app)

def token_required(controller_function):
    @wraps(controller_function)
    def wrapper_function(*args, **kwargs):
        # Make endpoint in the Auth Service to validate an Auth Token
        # The endpoint will return details such as User's Account ID
        auth_token = request.headers.get('Authorization', '')
        if not auth_token:
            abort(403, 'Not authorized')
        r = requests.get(os.environ['AUTH_MICROSERVICE_ADDRESS'] + "/verify", verify=False, headers={'Authorization': auth_token})
        # If the Response Json has an account_id which is not empty, the user is valid
        print(r.json())
        #if user['success'] == 'false':
            # You can also redirect the user to the login page.
        #    abort(403, 'Invalid user')
        #else:
        #    return controller_function(user, *args, **kwargs)

    return wrapper_function

from models import product, image
db.create_all()

from routes import product