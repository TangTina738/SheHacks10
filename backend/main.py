import os
import json
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)

@app.route("/api/match-round", methods=["POST"])
def match_round():
    data = request.json or {}
    base_topic = data.get("topic", "animals")
    
    # 1. Randomly pick a sub-category to force variety
    sub_categories = ["food", "colors", "shapes", "nature", "clothes", "toys", "school"]
    chosen_topic = random.choice(sub_categories) if base_topic == "random" else base_topic

    # 2. Add a random seed number to the prompt to trick the AI's cache
    random_seed = random.randint(1, 10000)

    prompt = f"""
    Generate a UNIQUE French-English matching challenge for a kid (age 6-10).
    Topic: {chosen_topic}
    Seed ID: {random_seed}

    Rules:
    - Pick a RANDOMLY different object every time. 
    - Ensure the 4 options are English words.
    - Return ONLY JSON:
    {{
      "challengeText": "A simple French noun",
      "options": ["English word 1", "English word 2", "English word 3", "English word 4"],
      "answerIndex": 0,
      "hint": "A fun simple clue in English about the object"
    }}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                # 3. Increase temperature for more "randomness"
                temperature=1.0, 
                top_p=0.95
            )
        )
        return jsonify(json.loads(response.text))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)