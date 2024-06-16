from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Access the API key from environment variables
API_KEY = os.getenv('API_KEY')

# Configure generative AI SDK with API key
genai.configure(api_key=API_KEY)

# Create the model with generation configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    # Optionally, you can set safety settings here if needed
    # safety_settings=...
)

# Start a chat session
chat_session = model.start_chat(
    history=[
        # Optionally, you can provide initial history here
    ]
)

# Example of sending a message and printing the response
user_input = "INSERT_INPUT_HERE"
response = chat_session.send_message(user_input)

print(response.text)
