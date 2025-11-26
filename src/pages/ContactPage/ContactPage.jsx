import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Header from "../../components/Common/Header";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { SiBluesky } from "react-icons/si";
import bgMain from "../../assets/scug.jpg";
import bgBehind from "../../assets/tanuki.jpg";

const ContactPage = () => {
  const socialLinks = [
    {
      name: "Twitter",
      url: "https://x.com/Makiato03",
      icon: <BsTwitterX />,
    },
    {
      name: "Bluesky",
      url: "https://bsky.app/profile/iceblueberrytea.bsky.social",
      icon: <SiBluesky />,
    },
    {
      name: "Discord",
      url: "https://discord.com/users/625913111827841036",
      icon: <FaDiscord />,
    },
    {
      name: "Discord Server (W.I.P)",
      url: "https://discord.com/users/625913111827841036",
      icon: <FaDiscord />,
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
      {/* Page Content */}
      <div className="flex-grow py-12 px-4 flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-3xl">
          
          <div>
            {/* Main Card with Background Image Overlay */}
            <div className="bg-[#22232b] shadow-2xl overflow-hidden relative rounded-t-2xl">
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
              {/* Header with rounded top */}
              <div className="px-5 py-2 flex items-center gap-3 border-[#1E3E78] bg-[#1d254d] rounded-t-2xl">
                <Header />
              </div>

              

              {/* Content */}
              <div className="p-8 md:p-12 relative z-10">
                {/* Intro Section */}
                <div className="text-center mb-8 md:mb-12">
                  <p className="text-sm md:text-lg text-[#EDF1FF] leading-relaxed mb-3">
                    You can find me through the following social media platforms:
                  </p>
                  <p className="text-sm md:text-lg text-[#EDF1FF] leading-relaxed">
                    Click any icon below to open the link in a new tab.
                  </p>
                </div>
                <div className="bg-[#22232b] shadow-2xl overflow-hidden relative">
                  
                </div>

                {/* Social Media Grid */}
                <div className="flex flex-col gap-3 w-full mx-auto">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-4 py-3 bg-transparent hover:bg-[#3d3e47] transition-all duration-300 rounded-lg group border border-[#3d3e47] hover:border-[#A8D8FF]"
                    >
                      <div className="text-2xl md:text-md text-[#EDF1FF] group-hover:text-[#A8D8FF] transition-all duration-300">
                        {social.icon}
                      </div>
                      <span className="text-xs md:text-sm font-medium text-[#EDF1FF] group-hover:text-[#A8D8FF] transition-all duration-300">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

export default ContactPage;