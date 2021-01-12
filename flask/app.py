from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields

mysql_username = "root"
mysql_password = "admin"
mysql_host = "localhost"
mysql_port = "3306"
mysql_db = "inventory"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + mysql_username + ':' + mysql_password + '@' + mysql_host + ':' + mysql_port + '/' + mysql_db
db = SQLAlchemy(app)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()


class Product(db.Model):
    __tablename__ = "product"
    idproduct = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    description = db.Column(db.Text)
    price = db.Column(db.Integer)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, name, description, price):
        self.name = name
        self.description = description
        self.price = price

    def __repr__(self):
        return '' % self.id


db.create_all()


class ProductSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Product
        sqla_session = db.session

    idproduct = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Number(required=True)


@app.route('/products', methods=['GET'])
def get_all_products():
    get_products = Product.query.all()
    product_schema = ProductSchema(many=True)
    products = product_schema.dump(get_products)
    return make_response(jsonify({"products": products}))