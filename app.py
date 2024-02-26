from flask import request, Flask, jsonify
from flask_cors import CORS, cross_origin
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://auto123:auto123@cluster0.amvg1ng.mongodb.net/"

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Connect to MongoDB
client = MongoClient(uri)

try:
    # Check if MongoDB server is available
    client.admin.command('ping')
    print("Connected to MongoDB successfully!")
except Exception as e:
    print("Error connecting to MongoDB:", e)

db = client.products
collection = db.products    
productList = list(collection.find())
# Further code for routes and other configurations...

@app.route("/")
def hello_world():
    return "<p>Welcome to product management API</p>"

@app.route("/products",methods = ["GET"])
def get_products():
    data = list(collection.find())
    if not data:
        return jsonify({"error":"Product not found"}),404
    return jsonify(data)

@app.route("/products",methods=["POST"])
def create_newProducts():
    data = request.get_json()
    id = collection.find_one({"id":data.get("_id")})
    if id:
        return jsonify({"error":"Cannot create new product"}),500
    collection.insert_one(data)
    return jsonify(data),200


@app.route("/products/<int:id>",methods=["DELETE"])
def delete_ProductData(id):
    data = collection.find_one({"_id":str(id)})
    if not data:
        return jsonify({"error":"Product not found"}),404
    collection.delete_one({"_id":str(id)})
    return jsonify({"message":"Product delete successfully"}),200

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)