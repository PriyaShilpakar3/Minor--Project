from bson import ObjectId
from app.database import captions_collection

def create_caption_entry(data: dict):
    return captions_collection.insert_one(data)

def get_captions_by_email(email: str):
    results = list(captions_collection.find({"email": email}))
    for r in results:
        r["id"] = str(r["_id"])
        del r["_id"]
    return results
