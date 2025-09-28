from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # 🔥 allow all origins (for testing)

# Your API key (keep it safe here, not in frontend)
SPOONACULAR_API_KEY = os.getenv("API_KEY")

@app.route("/")
def home():
    return "✅ Backend is running! Use /api/recipes?query=your_ingredient"

@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    query = request.args.get("query", "pasta")  # default if no query passed
    url = f"https://api.spoonacular.com/recipes/complexSearch?query={query}&apiKey={SPOONACULAR_API_KEY}"

    response = requests.get(url)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
