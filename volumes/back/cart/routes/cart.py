import requests
from app import app, db
from flask import request, jsonify, make_response
from datetime import date
from models.cart import Cart
from schemas.cart import CartSchema


@app.route('/api/carts', methods=['GET'])
def get_all_carts():
    get_carts = Cart.query.all()
    cart_schema = CartSchema(many=True)
    carts = cart_schema.dump(get_carts)

    return make_response(jsonify({"carts": carts}))


@app.route('/api/cart_by_id/<cart_id>', methods=['GET'])
def get_cart_by_id(cart_id):
    get_cart = Cart.query.get(cart_id)
    cart_schema = CartSchema()
    cart = cart_schema.dump(get_cart)
    return make_response(jsonify({"cart": cart}))

@app.route('/api/cart_by_user/<user_id>', methods=['GET'])
def get_cart_by_user(user_id):
    get_cart = Cart.query.filter(Cart.idUser == user_id)
    cart_schema = CartSchema()
    cart = cart_schema.dump(get_cart)
    return make_response(jsonify({"cart": cart}))

@app.route('/api/carts', methods=['POST'])
def create_cart():
    data = request.get_json()
    if 'products' in data:
        products = data['products']
        if not products:
            return make_response("empty cart", 400)
        for key, product in enumerate(products):
            r = requests.get('http://inventory_back:8000/api/products/' + str(product['id']))
            if not r.json()['product']:
                return make_response("non existent product", 404)
            if r.json()['product']['stock'] < int(product['quantity']):
                return make_response("not enough stock for product" + str(product['id']), 400)
            data['products'][key]['amount'] = str(int(r.json()['product']['price']) * int(product['quantity']))

    cart_schema = CartSchema()
    cart = cart_schema.load(data)
    result = cart_schema.dump(cart.create())
    return make_response(jsonify({"cart": result}), 200)

@app.route('/api/carts/validate/<cart_id>', methods=['POST'])
def validate(cart_id):
    cart = Cart.query.filter(Cart.id == cart_id).first()
    total_amount = sum(int(p['amount']) for p in cart.products)
    data = {"idUser": str(cart.idUser), "amount": str(total_amount), "products": cart.products}
    r = requests.post('http://order_back:8000/api/orders', json=data)
    return str(r.reason)

@app.route('/api/carts/<cart_id>', methods=['PUT'])
def update_cart(cart_id):
    data = request.get_json()
    get_cart = Cart.query.get(cart_id)
    if data.get('idUser'):
        get_cart.idUser = data['idUser']
    if data.get('products'):
        get_cart.products = data['products']
    db.session.add(get_cart)
    db.session.commit()
    cart_schema = CartSchema()
    cart = cart_schema.dump(get_cart)
    return make_response(jsonify({"cart": cart}))


@app.route('/api/carts/<cart_id>', methods=['DELETE'])
def delete_cart_by_id(cart_id):
    get_cart = Cart.query.get(cart_id)
    db.session.delete(get_cart)
    db.session.commit()
    return make_response("", 204)
