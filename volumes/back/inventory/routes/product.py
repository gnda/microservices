from app import app, db, token_required
from flask import request, jsonify, make_response
from models.product import Product
from schemas.image import ImageSchema
from schemas.product import ProductSchema


@app.route('/api/products', methods=['GET'])
@token_required
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
    db.session.add(product)
    db.session.commit()
    return make_response(jsonify({"success": True}), 200)

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
    if data.get('stock'):
        get_product.stock = data['stock']
    db.session.add(get_product)
    db.session.commit()
    product_schema = ProductSchema()
    product = product_schema.dump(get_product)
    return make_response(jsonify({"product": product}))

@app.route('/api/products/<product_id>', methods=['DELETE'])
def delete_product_by_id(product_id):
    get_product = Product.query.get(product_id)
    db.session.delete(get_product)
    db.session.commit()
    return make_response("", 204)