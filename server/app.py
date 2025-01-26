from flask import Flask, jsonify
from flask_cors import CORS
from models import User, SessionLocal

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/users', methods=['GET'])
def get_users():
    db = SessionLocal()

    users = db.query(User).all()

    db.close()

    users_data = [{"id": user.id, "name": user.name, "email": user.email} for user in users]

    return jsonify(users_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)