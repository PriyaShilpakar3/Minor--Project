from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch

model_name = "nlpconnect/vit-gpt2-image-captioning"

model = VisionEncoderDecoderModel.from_pretrained(model_name)
processor = ViTImageProcessor.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

def generate_caption(image):
    pixel_values = processor(images=image, return_tensors="pt").pixel_values.to(device)
    output_ids = model.generate(
        pixel_values,
        max_length=16,
        do_sample=True,    # Use sampling instead of beam search
        top_k=50,
        top_p=0.95,
        num_beams=1        # Disable beam search
    )
    caption = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return caption
