from datetime import datetime
from app import db

class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime())
    products = db.Column(db.JSON())

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, idUser, amount, products):
        self.idUser = idUser
        self.amount = amount
        self.createdAt = datetime.now()
        self.products = products

    def __repr__(self):
        return '' % self.id