#! /usr/bin/python3
from flask import Flask, Response, render_template, request, session, redirect, jsonify

app = Flask(__name__, static_url_path="/static")

@app.route("/")
def getInventory():
    """
    Retrieve inventory
    """
    return jsonify({"id": 3, "content": "actual content"})

if __name__ == "__main__":
    app.run("0.0.0.0", port=8000, debug=True)