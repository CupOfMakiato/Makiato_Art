import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { BiSolidDownArrow } from "react-icons/bi";
import HeaderLogo from "../../assets/cat-svgrepo-com.svg?react";
import meowSound from "../../assets/omori-meow.mp3";
import { HiHome } from "react-icons/hi";
import { MdOutlinePaid } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { BiQuestionMark } from "react-icons/bi";
import { MdContactMail } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Howl } from "howler";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const soundRef = useRef(null);
  const navItems = [
  { label: "Home", path: "/", icon: <HeaderLogo className="w-5 h-5" /> },
  { label: "Commission", path: "/commission", icon: <FaPaintBrush className="w-5 h-5" /> },
  { label: "T.O.S", path: "/tos", icon: <TbFileDescription className="w-5 h-5" /> },
  { label: "F.A.Q", path: "/faq", icon: <FaQuestionCircle className="w-5 h-5" /> },
  { label: "Contact", path: "/contact", icon: <IoMdMail className="w-5 h-5" /> },
];


  useEffect(() => {
    // Set current path
    setCurrentPath(window.location.pathname);
    
    // Initialize Howl immediately on mount
    soundRef.current = new Howl({
      src: [meowSound],
      volume: 1,
      html5: true,
      preload: true,
      onload: () => {
        console.log("Sound loaded successfully!");
      },
      onloaderror: (id, error) => {
        console.error("Error loading sound:", error);
      },
      onplayerror: (id, error) => {
        console.error("Error playing sound:", error);
        soundRef.current.once("unlock", () => {
          console.log("Audio unlocked!");
        });
      },
    });

    const markAudioReady = () => {
    };

    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, markAudioReady, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, markAudioReady);
      });
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to check if link is active
  const isActive = (path) => {
    return currentPath === path;
  };

  // Get active link classes
  const getLinkClasses = (path, isMobile = false) => {
  const base = `
  ${isMobile ? "flex" : "inline-flex"}
  items-center gap-1
  px-4 py-2 rounded-xl
  transition-all duration-300
`;


  const active = isActive(path)
    ? "bg-[#2C56A0] text-white font-bold shadow-md text-md"
    : "text-[#DBECF9] hover:bg-[#1E3E78] hover:text-white";

  return `${base} ${active}`;
};

  return (
    <header className="w-full bg-[#1D254D]">
  <div className="max-w-full mx-auto flex items-center justify-between px-4 py-4 text-md">

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center gap-3 font-medium text-md">
      {navItems.map((item) => (
        <a
          key={item.path}
          href={item.path}
          className={`${getLinkClasses(item.path)} flex items-center gap-2`}
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </nav>

    {/* Mobile Menu Button */}
    <button
      onClick={toggleMenu}
      className="md:hidden text-[#edf1ff] hover:text-[#2C56A0] focus:outline-none transition-all duration-300 hover:scale-110"
      aria-label="Toggle menu"
    >
      {isMenuOpen ? (
        <BiSolidDownArrow className="w-8 h-8" />
      ) : (
        <HiMenu className="w-8 h-8" />
      )}
    </button>
  </div>

  {/* Mobile Navigation */}
  <nav
    className={`md:hidden bg-[#1D254D] border-t border-[#2C56A0] transition-all duration-300 ease-in-out ${
      isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
    }`}
  >
    <div className="flex flex-col space-y-3 px-4 py-6 font-medium text-lg">
      {navItems.map((item) => (
        <a
          key={item.path}
          href={item.path}
          onClick={toggleMenu}
          className={`${getLinkClasses(item.path, true)} flex items-center gap-3`}
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </div>
  </nav>
</header>

  );
};

export default Header;
