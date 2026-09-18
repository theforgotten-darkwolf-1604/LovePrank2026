from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Answer(BaseModel):
    answer: str

@app.get("/")
def home():
    return {"status": "Love Prank backend is running"}

@app.post("/ai")
def generate_reply(data: Answer):
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        return {
            "reply": "I received your answer ❤️ AI is waiting for its API key."
        }

    client = OpenAI(api_key=api_key)

    response = client.responses.create(
        model="gpt-5.6-luna",
        instructions=(
            "You are the playful AI inside a romantic prank website. "
            "Read the person's answer to 'Yes? But how much? And why?' "
            "Reply in a cute, funny, teasing way. "
            "Keep it under 80 words. Do not be insulting or threatening."
        ),
        input=data.answer,
    )

    return {"reply": response.output_text}
