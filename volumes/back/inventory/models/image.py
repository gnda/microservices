from app import db

class Image(db.Model):
    __tablename__ = 'image'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    product = db.relationship("Product", backref="images")

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, url):
        self.url = url

    def __repr__(self):
        return '' % self.id