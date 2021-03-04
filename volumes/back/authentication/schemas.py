from models import UserModel
from app import ma

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserModel
        load_instance = True

    username = ma.auto_field(required=True)
    password = ma.auto_field(required=True)
    email = ma.auto_field(required=True)
    isAdmin = ma.auto_field(required=True)
    address = ma.auto_field(required=True)