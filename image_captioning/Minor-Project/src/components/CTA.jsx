import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';


const CTA = () => {

  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-800"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
          Share your experience with us!
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sign in with your Google account to leave a testimonial—just like thousands of happy users.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={redirectToLogin}
            className="bg-pink-200 text-pink-700 hover:bg-pink-300 px-8 py-4 rounded-xl font-medium text-lg transition duration-300 shadow-md"
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA; 


