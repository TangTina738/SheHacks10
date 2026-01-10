# entry point of flask server, define api routes 

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/health') 
def health(): 
    return jsonify({"status": "ok"})

@app.post('/api/echo')
def echo(): 
    data = request.get_json(force=True)
    return jsonify({"you_sent": data})

if __name__ == "__main__":
    app.run(debug=True, port=5000)