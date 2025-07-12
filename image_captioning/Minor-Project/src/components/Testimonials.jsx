import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    let { data, error } = await supabase
      .from("testimonials")
      .select("id, text, user_email, created_at")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error.message);
    } else if (data) {
      setTestimonials(data);
    }
  };

  return (
    <section id="testimonials" className="py-12 bg-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-semibold mb-8 text-pink-600 text-center">
          What Our Users Say
        </h3>

        {testimonials.length === 0 && (
          <p className="text-center text-gray-500">No testimonials yet.</p>
        )}

        <ul className="space-y-6">
          {testimonials.map(({ id, text, user_email, created_at }) => (
            <li
              key={id}
              className="bg-white p-6 rounded-lg shadow-md border border-pink-200"
            >
              <p className="text-gray-800 italic text-lg">"{text}"</p>
              <p className="text-sm text-gray-600 mt-2">
                — {user_email}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
