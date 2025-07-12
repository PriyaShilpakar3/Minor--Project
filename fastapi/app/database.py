import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # loads variables from .env

MONGO_DETAILS = os.getenv("mongodb+srv://shilpakarpri86:POLLOQdTKajAdPns@image-captioning-cluste.cxixzcy.mongodb.net/?retryWrites=true&w=majority", "mongodb://localhost:27017")

client = MongoClient(MONGO_DETAILS)
database = client['image_caption_db']
captions_collection = database['captions']
