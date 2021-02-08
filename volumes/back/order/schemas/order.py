from models.order import Order
from app import ma

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True

    id = ma.auto_field(dump_only=True)
    idUser = ma.auto_field(required=True)
    amount = ma.auto_field(required=True)
    products = ma.auto_field(required=True)