from models.product import Product
from app import ma

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True

    id = ma.auto_field(dump_only=True)
    name = ma.auto_field(required=True)
    description = ma.auto_field(required=True)
    price = ma.auto_field(required=True)
    images = ma.auto_field(required=False)