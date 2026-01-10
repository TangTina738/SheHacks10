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
    
    sub_categories = ["food", "colors", "shapes", "nature", "clothes", "toys", "school"]
    chosen_topic = random.choice(sub_categories) if base_topic == "random" else base_topic
    random_seed = random.randint(1, 10000)

    # UPDATED: Prompt now asks for a BATCH of 5 items to improve speed
    prompt = f"""
    Generate a LIST of 5 UNIQUE French-English matching challenges for a kid (age 6-10).
    Topic: {chosen_topic}
    Seed ID: {random_seed}

    Return ONLY a JSON array of objects:
    [
      {{
        "challengeText": "French word",
        "options": ["English 1", "English 2", "English 3", "English 4"],
        "answerIndex": 0,
        "hint": "English clue"
      }}
    ]
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=1.0
            )
        )
        
        raw_text = response.text.strip()
        if raw_text.startswith("```"):
            raw_text = raw_text.split("```json")[-1].split("```")[0].strip()
            
        return jsonify(json.loads(raw_text))
    
    except Exception as e:
        print(f"!!! BACKEND ERROR !!!: {e}") 
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)