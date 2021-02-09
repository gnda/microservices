from models.cart import Cart
from app import ma

class CartSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cart
        load_instance = True

    id = ma.auto_field(dump_only=True)
    idUser = ma.auto_field(required=True)
    products = ma.auto_field(required=True)