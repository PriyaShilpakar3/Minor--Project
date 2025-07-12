const generateCaption = async () => {
  if (!selectedImage) {
    alert("Please upload an image.");
    return;
  }

  setIsGenerating(true);

  try {
    const formData = new FormData();

    // convert base64 image to blob
    const imageBlob = await fetch(selectedImage).then((res) => res.blob());
    formData.append("file", imageBlob, "image.png");
    formData.append("email", "anonymous@example.com");

    const response = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    setCaption(data.caption);
  } catch (error) {
    console.error("Upload error:", error);
    alert("Error: " + error.message);
  } finally {
    setIsGenerating(false);
  }
};
