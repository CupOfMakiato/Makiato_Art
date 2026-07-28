import React, { useState, useEffect }from "react";
import MainLayout from "../../layouts/MainLayout";
import Header from "../../components/Common/Header";
import AnimatedPageCard from "../../components/Common/AnimatedPageCard";
import bgMain from "../../assets/scug.jpg";
import bgBehind from "../../assets/tanuki.jpg";
const AboutPage = () => {
  
  const [isContentAnimating, setIsContentAnimating] = useState(false);

  useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e) => e.preventDefault();
    
        // Disable keyboard shortcuts
        const handleKeyDown = (e) => {
          if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
            (e.ctrlKey && e.key.toLowerCase() === 'u') ||
            (e.ctrlKey && e.key.toLowerCase() === 's')
          ) {
            e.preventDefault();
            return false;
          }
        };
    
        // Disable image dragging
        const handleDragStart = (e) => {
          if (e.target.tagName === 'IMG') e.preventDefault();
        };
    
        // Add listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('dragstart', handleDragStart);
  
        // Trigger fade-in animation when component mounts
        setTimeout(() => setIsContentAnimating(true), 10);
    
        // Cleanup on unmount
        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('dragstart', handleDragStart);
        };
      }, []);
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgBehind})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "#545D80",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Page Content */}
      <div className="grow py-12 px-4 flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-3xl">
          
          <AnimatedPageCard>
            {/* Main Card with Background Image Overlay */}
            <div className="bg-[#22232b] shadow-2xl overflow-hidden relative rounded-2xl">
              {/* Background Image Overlay for Card */}
              <div
                className="absolute inset-0 opacity-20 z-0"
                style={{
                  backgroundImage: `url(${bgMain})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  pointerEvents: "none",
                }}
              ></div>
              <Header />

              

              {/* Content */}
              <div className={`p-8 md:p-12 relative z-10 transition-all duration-500 ${
                isContentAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {/* <div className="text-center mb-8 md:mb-12">
                  <p>
                    This page is currently under construction. Please check back later for updates!
                  </p>
                  <span>
                  </span>
                </div> */}
                <div className="shadow-2xl overflow-hidden relative">
                  <p className="text-center mb-8 md:mb-12">
                    The website uses Trello to store images and information, which explains the slow loading time~
                  </p>

                  <p className="text-center mb-8 md:mb-12">
                    This is only a static page with no server-side functionality. Media is still exposed and not proxied.
                  </p>
                </div>
                <div className="bg-[#22232b] shadow-2xl overflow-hidden relative">
                </div>
              </div>
            </div>
          </AnimatedPageCard>
        </div>
        
      </div>
      {/* Footer */}
      <footer className="w-full bg-transparent py-6 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center text-center">
            <p className="text-[#DBECF9] text-sm md:text-base">
              © {new Date().getFullYear()} Developed by{" "}
              <a
                href="https://github.com/CupOfMakiato"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DBECF9] hover:text-white hover:scale-105 inline-block transition-all duration-300 font-semibold"
              >
                Makiato
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
    
  );
};

export default AboutPage;
