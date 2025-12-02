import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Common/Header";
import bgMain from "../../assets/scug.jpg";
import bgBehind from "../../assets/tanuki.jpg";
import clickSound from "../../assets/collapsible_open.mp3";
import { Howl } from "howler";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isContentAnimating, setIsContentAnimating] = useState(false);
  const clickSoundRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);

  // Initialize audio in useEffect
    useEffect(() => {
      clickSoundRef.current = new Howl({
        src: [clickSound],
        volume: 0.4,
        html5: true,
        preload: true,
      });
  
      const markAudioReady = () => {
        setAudioReady(true);
      };
  
      const events = ["click", "touchstart", "keydown"];
      events.forEach((event) => {
        document.addEventListener(event, markAudioReady, { once: true });
      });
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

      // Cleanup function
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('dragstart', handleDragStart);
        events.forEach((event) => {
          document.removeEventListener(event, markAudioReady);
        });
        if (clickSoundRef.current) clickSoundRef.current.unload();
      };
      
    }, []);
    

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    playClickSound();
  };

  const playClickSound = () => {
    if (clickSoundRef.current && audioReady) {
      clickSoundRef.current.play();
    }
  };

  const faqs = [
    {
      question: "What software do you use?",
      answer: "I primarily use Ibis Paint X for digital illustrations on my iPad. A mix of Procreate and Adobe Lightroom for editing and finishing touches."
    },
    {
      question: "Are your commissions open?",
      answer: "For my Commission status, you can check my posts on Twitter or the Commission page on this website for the latest updates."
    },
    {
      question: "How long have you been drawing?",
      answer: "I started around 2022, so it's been a couple of years now! Still learning and growing every day."
    },
    {
      question: "Where do you get your sound effects?",
      answer: "Some Discord soundboards, YouTube audio library, and freesound.org"
    },
    {
      question: "What framework did you use to build this website?",
      answer: "I built this website using Reactjs and Tailwindcss :P"
    },
  ];

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
      <div className="flex-grow py-12 px-4 flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-3xl">
          <div>
            <div className="bg-[#22232b] shadow-2xl overflow-hidden relative rounded-t-2xl">
              <div
                className="absolute inset-0 opacity-20 z-0"
                style={{
                  backgroundImage: `url(${bgMain})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  pointerEvents: "none",
                }}
              ></div>
              
              <div className="px-5 py-2 flex items-center gap-3 border-[#1E3E78] bg-[#1d254d] rounded-t-2xl">
                <Header />
              </div>

              <div className={`p-8 md:p-12 relative z-10 transition-all duration-500 ${
                isContentAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="space-y-3 w-full mx-auto">
                    {/* <h1 className="text-4xl md:text-5xl font-black text-[#EDF1FF] mb-4 tracking-tight text-center">
                        F.A.Q
                      </h1>
                      <div className="border-b-2 border-[#d1daff] opacity-50 border-dashed mb-10"></div> */}
                  {faqs.map((faq, index) => (
                    <div key={index} className="w-full">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-transparent hover:bg-[#3d3e47] transition-all duration-300 rounded-lg group border border-[#3d3e47] hover:border-[#A8D8FF]"
                        aria-expanded={openIndex === index}
                      >
                        <span className="text-sm md:text-lg font-medium text-[#EDF1FF] group-hover:text-[#A8D8FF] transition-all duration-300 text-left">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-5 h-5 text-[#EDF1FF] group-hover:text-[#A8D8FF] transform transition-all duration-300 flex-shrink-0 ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 py-3 mt-2 bg-transparent rounded-lg border border-[#3d3e47]">
                          <p className="text-[#EDF1FF] text-xs md:text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Faq;