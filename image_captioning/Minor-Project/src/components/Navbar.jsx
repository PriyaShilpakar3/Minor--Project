import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");
        
        if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight - 300) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
    setMobileDrawerOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 py-3 backdrop-blur-lg border-b ${
      scrolled ? "border-neutral-200" : "border-transparent"
    } transition-all duration-300 bg-white/80`}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              className="h-10 w-10 mr-3 cursor-pointer" 
              src={logo} 
              alt="Logo"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("");
              }}
            />
            <span className="text-xl font-bold">CaptionGen</span>
          </div>

          <ul className="hidden lg:flex space-x-12">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className={`hover:text-blue-500 transition ${
                    activeSection === item.href.substring(1) ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="lg:hidden">
            <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}>
              {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-20 px-4">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className={`text-lg ${
                    activeSection === item.href.substring(1) ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;