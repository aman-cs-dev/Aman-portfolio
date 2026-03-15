import os
from twilio.rest import Client
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body structure
class MessageRequest(BaseModel):
    message: str

def send_twilio_message(message: str, mode: str = "sms"):
    sid = os.getenv("TWILIO_ID")
    tok = os.getenv("TWILIO_AUTH_TOKEN")
    to_n = os.getenv("TWILIO_TO_NUMBER")
    
    if mode == "sms":
        from_n = os.getenv("TWILIO_FROM_NUMBER")
        prefix = ""
    else:
        from_n = os.getenv("TWILIO_W_FROM_NUMBER")
        prefix = "whatsapp:"

    if not all([sid, tok, from_n, to_n]):
        raise ValueError("Missing Twilio Environment Variables")

    client = Client(sid, tok)
    client.messages.create(
        body=message, 
        from_=f"{prefix}{from_n}", 
        to=f"{prefix}{to_n}"
    )

@app.get("/")
def health_check():
    return {"status": "Twilio API is online"}

@app.post("/send-notif")
async def handle_notification(data: MessageRequest):
    try:
     
        send_twilio_message(data.message, mode="sms")
        send_twilio_message(data.message, mode="whatsapp")
        
     
        return {"status": "success", "message": "Sent successfully"}
    
    except Exception as e:
        print(f"Error occurred: {e}")
        
        return {"status": "partial_success", "error": str(e)}