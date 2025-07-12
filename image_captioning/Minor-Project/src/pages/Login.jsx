import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // This effect handles ONLY authentication
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Handle auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session) {
          navigate("/");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // This effect handles ONLY the eye button functionality
  useEffect(() => {
    const handlePasswordToggle = (show) => {
      const passwordInputs = document.querySelectorAll('input[type="password"]');
      passwordInputs.forEach(input => {
        input.type = show ? "text" : "password";
      });
    };

    const addEyeButtons = () => {
      const passwordWrappers = document.querySelectorAll('.supabase-auth-ui_ui-input-wrapper');
      
      passwordWrappers.forEach(wrapper => {
        const input = wrapper.querySelector('input[type="password"]');
        if (input && !wrapper.querySelector('.password-toggle')) {
          const eyeButton = document.createElement('button');
          eyeButton.type = "button";
          eyeButton.className = 'password-toggle absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500';
          eyeButton.innerHTML = '👁️‍🗨️';
          eyeButton.onclick = (e) => {
            e.preventDefault();
            const isShowing = input.type === "text";
            input.type = isShowing ? "password" : "text";
            eyeButton.innerHTML = isShowing ? '👁️‍🗨️' : '👁️';
          };
          wrapper.style.position = 'relative';
          wrapper.appendChild(eyeButton);
        }
      });
    };

    // Run with small delay to ensure Auth UI is rendered
    const timer = setTimeout(() => {
      addEyeButtons();
    }, 300);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-pink-600">
          Login or Sign Up
        </h2>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Your Email",
                password_label: "Your Password",
                button_label: "Sign In",
              },
              sign_up: {
                email_label: "Email",
                password_label: "Password",
                button_label: "Sign Up",
              },
            },
          }}
          theme="light"
          onlyThirdPartyProviders={false}
        />

        {/* Rest of your existing JSX remains unchanged */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
        )}

        <div className="mt-6 text-sm text-center text-gray-500">
          <p>⚠️ Make sure you sign up first if you don't have an account.</p>
          <p>📧 Confirm your email before logging in.</p>
          <p>❗ Double-check your credentials when signing in.</p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-pink-600 underline hover:text-pink-800"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;