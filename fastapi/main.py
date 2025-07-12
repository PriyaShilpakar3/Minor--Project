from typing import Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from PIL import Image
import io
import base64
from caption_generator import generate_caption
from caption_generator import generate_caption


app = FastAPI()

# CORS setup - allow your React frontend only
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # <-- React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["image_captioning"]
collection = db["captions"]

# Helper function to base64 encode images for storage/transfer
def encode_image(image_bytes):
    return base64.b64encode(image_bytes).decode("utf-8")

# Root endpoint
@app.get("/")
async def home():
    return {"message": "Welcome to the Image Captioning API"}

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...), email: Optional[str] = Form(None)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        caption = generate_caption(image)
        print("Caption generated:", caption)  # <-- This must be here

        image_base64 = encode_image(image_bytes)
        user_email = email if email else "anonymous@example.com"

        result = collection.insert_one({
            "email": user_email,
            "caption": caption,
            "image": image_base64,
            "feedback": None
        })

        return {
            "message": "Image uploaded successfully",
            "id": str(result.inserted_id),
            "caption": caption
        }
    except Exception as e:
        print("Error during upload:", e)   # <-- Add this to catch errors!
        raise HTTPException(status_code=500, detail=str(e))


# Get all captions with associated data
@app.get("/captions/")
def get_all_captions():
    data = []
    for doc in collection.find():
        data.append({
            "id": str(doc["_id"]),
            "email": doc["email"],
            "caption": doc["caption"],
            "image": doc["image"],
            "feedback": doc.get("feedback", None)
        })
    return data

# Submit feedback for a given caption document
@app.post("/feedback/")
def give_feedback(id: str = Form(...), feedback: str = Form(...)):
    result = collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"feedback": feedback}}
    )
    if result.modified_count == 1:
        return {"message": "Feedback updated"}
    raise HTTPException(status_code=404, detail="Document not found")
