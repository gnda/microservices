from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields

mysql_username = "user"
mysql_password = "test1234"
mysql_host = "inventory_db"
mysql_port = "3306"
mysql_db = "inventory_db"

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + mysql_username + ':' + mysql_password + '@' + mysql_host + ':' + mysql_port + '/' + mysql_db
db = SQLAlchemy(app)


@app.route('/')
def hello_world():
    return 'Hello World'


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


@app.route('/api/products', methods=['GET'])
def get_all_products():
    get_products = Product.query.all()
    product_schema = ProductSchema(many=True)
    products = product_schema.dump(get_products)

    return make_response(jsonify({"products": products}))


@app.route('/api/products/<product_id>', methods=['GET'])
def get_one_product(product_id):
    get_product = Product.query.get(product_id)
    product_schema = ProductSchema()
    product = product_schema.dump(get_product)
    return make_response(jsonify({"product": product}))


@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    product_schema = ProductSchema()
    product = product_schema.load(data)
    result = product_schema.dump(product.create())
    return make_response(jsonify({"product": result}), 200)


@app.route('/api/products/<product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    get_product = Product.query.get(product_id)
    if data.get('name'):
        get_product.name = data['name']
    if data.get('description'):
        get_product.description = data['description']
    if data.get('price'):
        get_product.price = data['price']
    db.session.add(get_product)
    db.session.commit()
    product_schema = ProductSchema(only=['id', 'name', 'description', 'price'])
    product = product_schema.dump(get_product)
    return make_response(jsonify({"product": product}))


def delete_product_by_id(product_id):
    get_product = Product.query.get(product_id)
    db.session.delete(get_product)
    db.session.commit()
    return make_response("", 204)


if __name__ == '__main__':
    app.run("0.0.0.0", port=8000, debug=True)
