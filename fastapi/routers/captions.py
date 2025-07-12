from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from pymongo import MongoClient
from PIL import Image
from bson import ObjectId
from caption_generator import generate_caption
import base64
import io
from fastapi import Query


router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["image_captioning"]
collection = db["captions"]

def encode_image(image_bytes):
    return base64.b64encode(image_bytes).decode("utf-8")

@router.post("/upload/")
async def upload_image(file: UploadFile = File(...), email: str = Form(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        caption = generate_caption(image)
        encoded_image = encode_image(image_bytes)

        result = collection.insert_one({
            "email": email,
            "caption": caption,
            "image": encoded_image,
            "feedback": None
        })

        return {
            "message": "Uploaded successfully",
            "id": str(result.inserted_id),
            "caption": caption
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/feedback/")
def give_feedback(id: str = Form(...), feedback: str = Form(...)):
    result = collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"feedback": feedback}}
    )
    if result.modified_count == 1:
        return {"message": "Feedback updated"}
    raise HTTPException(status_code=404, detail="Document not found")


@router.get("/captions/")
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
