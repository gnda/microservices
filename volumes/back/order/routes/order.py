import os
import requests
from app import app, db
from flask import request, jsonify, make_response
from datetime import date
from models.order import Order
from schemas.order import OrderSchema


@app.route('/api/orders', methods=['GET'])
def get_all_orders():
    get_orders = Order.query.all()
    order_schema = OrderSchema(many=True)
    orders = order_schema.dump(get_orders)

    return make_response(jsonify({"orders": orders}))


@app.route('/api/orders/id/<order_id>', methods=['GET'])
def get_one_order(order_id):
    get_order = Order.query.get(order_id)
    order_schema = OrderSchema()
    order = order_schema.dump(get_order)
    return make_response(jsonify({"order": order}))

@app.route('/api/orders/user/<user_id>', methods=['GET'])
def get_orders_by_user(user_id):
    get_orders = Order.query.filter(Order.idUser == user_id)
    order_schema = OrderSchema(many=True)
    orders = order_schema.dump(get_orders)
    return make_response(jsonify({"orders": orders}))


@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    if 'products' in data:
        products = data['products']
        if not products:
            return make_response("empty order", 400)
        for product in products:
            r = requests.get(os.environ['INVENTORY_ADDRESS'] + '/api/products/' + str(product['id']))
            if not r.json()['product']:
                return make_response("non existent product", 404)
            if r.json()['product']['stock'] < int(product['quantity']):
                return make_response("not enough stock for product"+str(product['id']), 400)
            new_stock = int(r.json()['product']['stock']) - int(product['quantity'])
            requests.put(os.environ['INVENTORY_ADDRESS'] + '/api/products/' + str(product['id']), json={'stock': str(new_stock)})
    order_schema = OrderSchema()
    order = order_schema.load(data)
    result = order_schema.dump(order.create())
    return make_response(jsonify({"order": result}), 200)


@app.route('/api/orders/<order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    get_order = Order.query.get(order_id)
    if data.get('amount'):
        get_order.amount = data['amount']
    if data.get('products'):
        get_order.amount = data['products']
    get_order.createdAt = date()
    db.session.add(get_order)
    db.session.commit()
    order_schema = OrderSchema()
    order = order_schema.dump(get_order)
    return make_response(jsonify({"order": order}))


@app.route('/api/orders/<order_id>', methods=['DELETE'])
def delete_order_by_id(order_id):
    get_order = Order.query.get(order_id)
    db.session.delete(get_order)
    db.session.commit()
    return make_response("", 204)
