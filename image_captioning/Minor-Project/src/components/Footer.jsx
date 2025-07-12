const Footer = () => {
  return (
    <footer className="h-48 w-full bg-gradient-to-r from-transparent via-blue-100 to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* App Name */}
          <div className="mb-4">
            <span className="text-2xl font-semibold text-purple-800">CaptionGen</span>
          </div>

          {/* Tagline */}
          <p className="mb-2 text-sm sm:text-base text-purple-700">
            AI-powered caption generator for your photos.
          </p>

          {/* Team Info */}
          <p className="mb-2 text-sm sm:text-base text-purple-700">
            Minor project for 6th semester Software Engineering.
          </p>
          <p className="mb-4 text-sm sm:text-base text-purple-900 font-medium">
            Developed by <span className="text-purple-800 font-semibold">Mahigya, Anisha, and Priya</span>.
          </p>

          {/* Copyright */}
          <p className="text-xs text-purple-600">
            © {new Date().getFullYear()} CaptionGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
