// src/components/Hero.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/profile-pictures/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Context-Aware Captioning for{" "}
              <span className="text-blue-500">Every Photo</span>
            </h1>
            <p className="text-xl mb-8">
              Employ advanced AI algorithms to generate precise,
              context-sensitive image captions for visually impaired users.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/generate-caption")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition duration-300"
              >
                Try It <ArrowRight className="ml-2" />
              </button>
            </div>
          </div>

          {/* Image Demo */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-200 rounded-2xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-10 -right-6 w-64 h-64 bg-pink-200 rounded-2xl opacity-70 animate-float animation-delay-1000"></div>

              <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-gray-100 cursor-pointer">
                <img
                  src={heroImage}
                  alt="Example with AI-generated caption"
                  className="rounded-lg w-full h-auto object-contain"
                  onClick={() => setIsModalOpen(true)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 600'%3E%3Crect fill='%23ddd' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='40' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 italic">
                    "A white cat strides gracefully through the snow ❄️🐾"
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={heroImage}
              alt="Full size preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
