const howItWorksSteps = [
  {
    title: "Upload Your Picture",
    description: "Drag & drop or select an image from your device",
    emoji: "📤",
  },
  {
    title: "AI Analyzes Content",
    description: "Our system detects objects, colors, and context",
    emoji: "🤖",
  },
  {
    title: "Get Perfect Captions",
    description: "Instantly produce a precise and semantically relevant caption for any image",
    emoji: "✨",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Get the perfect caption in just three simple steps
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {howItWorksSteps.map((step, index) => (
            <div 
              key={index}
              className="flex-1 bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-2xl mb-6">
                {step.emoji}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;