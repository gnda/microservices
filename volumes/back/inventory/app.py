from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

mysql_username = "user"
mysql_password = "test1234"
mysql_host = "inventory_db"
mysql_port = "3306"
mysql_db = "inventory_db"

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + mysql_username + ':' \
    + mysql_password + '@' + mysql_host + ':' + mysql_port + '/' + mysql_db
db = SQLAlchemy(app)
ma = Marshmallow(app)

from models import product, image
db.create_all()

from controllers import product_controller