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

USED_WORDS = {
    "animals": set(),
    "food": set(),
    "colors": set(),
    "shapes": set(),
    "nature": set(),
    "clothes": set(),
    "toys": set(),
    "school": set(),
}

@app.route("/api/match-round", methods=["POST"])
def match_round():
    data = request.json or {}
    base_topic = data.get("topic")
    
    sub_categories = ["food", "colors", "shapes", "nature", "clothes", "toys", "school"]
    chosen_topic = random.choice(sub_categories) if base_topic == "random" else base_topic
    random_seed = random.randint(1, 10000)

    used_words = list(USED_WORDS.get(chosen_topic, []))
    used_words_text = ", ".join(used_words) if used_words else "NONE"

    # UPDATED: Prompt now asks for a BATCH of 5 items to improve speed
    prompt = f"""
    Generate a LIST of 15 UNIQUE French-English matching challenges for a kid (age 6-10). 
    Rules:
    - Do NOT use any of these French words: {used_words_text}
    - Do not repeat any French or English word within the list
    - Use simple, kid-friendly nouns
    - Each French word must appear only once    
    -
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

        if raw_text.startswith("'''"):
            raw_text = raw_text.split("'''json")[-1].split("'''")[0].strip()

        parsed = json.loads(raw_text)

        for item in parsed:
            USED_WORDS[chosen_topic].add(item["challengeText"])

        random.shuffle(parsed)

        return jsonify(parsed)

    except Exception as e:
        print(f"!!! BACKEND ERROR !!!: {e}") 
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)