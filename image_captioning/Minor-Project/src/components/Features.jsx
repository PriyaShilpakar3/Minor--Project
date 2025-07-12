import { BotMessageSquare, BatteryCharging, Fingerprint, ShieldHalf, PlugZap, GlobeLock } from "lucide-react";

const features = [
  {
    icon: <BotMessageSquare className="w-6 h-6" />,
    text: "AI-Powered Captions",
    description: "Get smart, context-aware captions generated instantly.",
  },
  {
    icon: <Fingerprint className="w-6 h-6" />,
    text: "Accessible Captions",
    description: "Generate clear, descriptive captions to assist visually impaired users.",
  },
  {
    icon: <ShieldHalf className="w-6 h-6" />,
    text: "Real-Time Feedback",
    description: "Preview captions live to ensure clarity and relevance for all users.",
  },
  {
    icon: <BatteryCharging className="w-6 h-6" />,
    text: "Dynamic Preview Interface",
    description: "Provide real-time caption visualization to assist researchers in evaluating caption effectiveness and accessibility standards adherence.",
  },
  {
    icon: <PlugZap className="w-6 h-6" />,
    text: "Automated Dataset Annotation",
    description: "Leverage AI-powered captioning to generate consistent, high-quality annotations for large-scale image datasets used in academic and scientific research.",
  },
  {
    icon: <GlobeLock className="w-6 h-6" />,
    text: "Vocal Accessibility Support",
    description: "Generate captions optimized for vocal rendering through screen readers, enhancing comprehension for visually impaired users.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          AI-powered image descriptions tailored for accessibility and clarity.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.text}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;