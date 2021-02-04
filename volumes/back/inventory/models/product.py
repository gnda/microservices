from app import db

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    description = db.Column(db.Text)
    price = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    images = db.relationship("Image", back_populates="product", lazy='dynamic')

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, name, description, price, stock):
        self.name = name
        self.description = description
        self.price = price
        self.stock = stock


    def __repr__(self):
        return '' % self.id