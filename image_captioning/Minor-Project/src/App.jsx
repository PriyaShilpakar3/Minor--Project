import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./supabase";

import Login from "./pages/Login";
import GenerateCaption from "./pages/GenerateCaption";
import SubmitTestimonial from "./pages/SubmitTestimonial";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <CTA />
            <Footer />
          </div>
        }
      />
      <Route path="/generate-caption" element={<GenerateCaption />} />
      <Route
        path="/submit-testimonial"
        element={<SubmitTestimonial session={session} />}
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
