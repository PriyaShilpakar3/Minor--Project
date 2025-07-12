import { useState } from "react";
import { supabase } from "../supabase"; // Adjust the import path if needed
import { useNavigate } from "react-router-dom";

const SubmitTestimonial = ({ session }) => {
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testimonial.trim()) {
      alert("Please enter your testimonial.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("testimonials").insert([
      {
        user_id: session.user.id,
        user_email: session.user.email, // ✅ Add user's email to database
        text: testimonial.trim(),       // ✅ Changed key to match your schema
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error submitting testimonial: " + error.message);
    } else {
      alert("Testimonial submitted successfully!");
      setTestimonial("");
      navigate("/"); // Redirect to home page after submit
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Navigation buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-pink-600 hover:underline"
        >
          ← Back to Home
        </button>
        <button
          onClick={() => navigate("/login")}
          className="text-pink-600 hover:underline"
        >
          ← Back to Login
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-pink-600 text-center">
        Submit Your Testimonial
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md resize-none"
          rows={6}
          placeholder="Write your testimonial here..."
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          className={`mt-4 w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
};

export default SubmitTestimonial;
