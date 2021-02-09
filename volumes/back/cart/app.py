import os
from flask import Flask
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

from models import cart
db.create_all()

from routes import cart