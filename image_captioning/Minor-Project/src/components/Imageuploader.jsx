import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Volume2, ImageIcon, Loader2, X } from "lucide-react";

export default function ImageUploader() {
  const [caption, setCaption] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const speakCaption = () => {
    if (caption && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(caption);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setCaption("");
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendToBackend = async (file) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", "anonymous@example.com");

      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to get caption");

      const data = await response.json();
      setCaption(data.caption);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      sendToBackend(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileUpload(files[0]);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <motion.h1 className="text-4xl font-bold text-gray-800 mb-2">
          Snap2Sense Caption Generator
          </motion.h1>
          <motion.p className="text-lg text-gray-600">
            Upload an image and let our model describe it
          </motion.p>
        </div>

        <motion.div layout className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <AnimatePresence mode="wait">
            {!uploadedImage ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  isDragOver
                    ? "border-blue-400 bg-blue-50 scale-105"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
              >
                <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Drop your image here
                </h3>
                <p className="text-gray-500 mb-6">or click to browse files</p>
                <button className="transition-all duration-300 hover:scale-105 bg-transparent text-blue-500 font-semibold">
                  <ImageIcon className="inline-block mr-2" /> Choose Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={resetUpload}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {isLoading ? (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      <Loader2 className="h-12 w-12 text-blue-500" />
                    </motion.div>
                    <p className="text-lg text-gray-600 mt-4">Analyzing image...</p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5 }}
                      className="h-1 bg-blue-500 rounded-full mt-4 mx-auto max-w-xs"
                    />
                  </div>
                ) : caption ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mt-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Generated Caption:
                    </h3>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">{caption}</p>
                    <div className="flex gap-4">
                      <button
                        onClick={speakCaption}
                        className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                      >
                        <Volume2 className="w-5 h-5" />
                        Read Aloud
                      </button>
                      <button
                        onClick={resetUpload}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Upload Another
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          Powered by AI • JPG, PNG, and GIF supported
        </div>
      </motion.div>
    </div>
  );
}
