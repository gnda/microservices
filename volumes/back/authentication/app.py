import jwt
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

mysql_username = "user"
mysql_password = "test1234"
mysql_host = "authentication_db"
mysql_port = "3306"
mysql_db = "authentication_db"

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + mysql_username + ':' \
    + mysql_password + '@' + mysql_host + ':' + mysql_port + '/' + mysql_db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'ThisIsHardestThing'
app.config['JWT_SECRET_KEY'] = 'Dude!WhyShouldYouEncryptIt'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

# Object of Api class
api = Api(app)

# SqlAlchemy object
db = SQLAlchemy(app)

# JwtManager object
jwt = JWTManager(app)

@app.before_first_request
def create_tables():
    db.create_all()

# Importing models and resources
import models, resources

# Checking that token is in blacklist or not
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']

    return models.RevokedTokenModel.is_jti_blacklisted(jti)

# Api Endpoints

api.add_resource(resources.UserRegistration, '/registration')
api.add_resource(resources.UserLogin, '/login')
api.add_resource(resources.UserLogoutAccess, '/logout/access')
api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
api.add_resource(resources.TokenRefresh, '/token/refresh')
api.add_resource(resources.AllUsers, '/users')
api.add_resource(resources.SecretResource, '/secret')

if __name__ == '__main__':
    app.run("0.0.0.0", port=8000, debug=True)