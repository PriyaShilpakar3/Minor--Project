from pydantic import BaseModel

class CaptionEntry(BaseModel):
    email: str
    image_filename: str
    caption: str
    feedback: str | None = None  # Optional feedback
