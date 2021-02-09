from app import db

class Cart(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer)
    products = db.Column(db.JSON())

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, idUser, products):
        self.idUser = idUser
        self.products = products

    def __repr__(self):
        return '' % self.id