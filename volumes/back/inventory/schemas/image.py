from models.image import Image
from app import ma

class ImageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Image
        include_fk = True
        load_instance = True