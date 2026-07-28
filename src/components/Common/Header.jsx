import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { BiSolidDownArrow } from "react-icons/bi";
import headerClickSound from "../../assets/animation-up-2.mp3";
import headerHoverSound from "../../assets/cube-sort.mp3";
import { TbFileDescription } from "react-icons/tb";
import { FaPaintBrush } from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";
import { PiPawPrintFill } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useHowlSound } from "../../utils/useHowlSound";
import { cursorInteractions } from "../../utils/cursorInteraction";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hoverSoundReadyRef = useRef(false);
  const { pathname } = useLocation();
  const { play: playHoverSound, stop: stopHoverSound } = useHowlSound(
    headerHoverSound,
    { persist: true, volume: 0.35 }
  );
  const { play: playClickSound, stop: stopClickSound } = useHowlSound(
    headerClickSound,
    { persist: true, volume: 0.45 }
  );

  const navItems = [
    { label: "Home", path: "/", icon: <PiPawPrintFill className="w-5 h-5" /> },
    {
      label: "Commission",
      path: "/commission",
      icon: <FaPaintBrush className="w-5 h-5" />,
    },
    {
      label: "T.O.S",
      path: "/tos",
      icon: <TbFileDescription className="w-5 h-5" />,
    },
    {
      label: "F.A.Q",
      path: "/faq",
      icon: <FaRegQuestionCircle className="w-5 h-5" />,
    },
    {
      label: "Links",
      path: "/contact",
      icon: <PiLinkSimpleBold className="w-5 h-5" />,
    },
    {
      label: "About",
      path : "/about",
      icon: <FaRegQuestionCircle className="w-5 h-5" />,
    }
  ];

  useEffect(() => {
    hoverSoundReadyRef.current = false;

    const hoverSoundTimer = window.setTimeout(() => {
      hoverSoundReadyRef.current = true;
    }, 250);

    return () => window.clearTimeout(hoverSoundTimer);
  }, [pathname]);

  const playHoverCue = () => {
    if (!hoverSoundReadyRef.current) return;

    stopHoverSound();
    playHoverSound();
  };

  const playClickCue = () => {
    stopClickSound();
    playClickSound();
  };

  const toggleMenu = () => {
    playClickCue();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => pathname === path;

  const handleNavClick = (path, shouldCloseMenu = false) => {
    if (!isActive(path)) {
      playClickCue();
    }

    if (shouldCloseMenu) {
      closeMenu();
    }
  };

  const getLinkClasses = (path, isMobile = false) => {
    const base = `${cursorInteractions.button} ${isMobile ? "flex" : "inline-flex"} items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300`;

    const active = isActive(path)
      ? "bg-[#2C56A0] text-white font-bold shadow-md text-md transition-all duration-300 hover:scale-105"
      : "text-[#DBECF9] hover:bg-[#1E3E78] hover:text-white transition-all duration-300 hover:scale-105";

    return `${base} ${active}`;
  };

  return (
    <header className="w-full bg-[#1D254D] relative z-40">
      <div className="max-w-full mx-auto flex items-center justify-between px-4 h-16 text-md">
        <nav className="hidden md:flex items-center gap-3 font-medium text-md">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={playHoverCue}
              onClick={() => handleNavClick(item.path)}
              className={`${getLinkClasses(item.path)} flex items-center gap-2`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleMenu}
          onMouseEnter={playHoverCue}
          className={`${cursorInteractions.button} md:hidden text-[#edf1ff] hover:text-[#2C56A0] focus:outline-none transition-all duration-300 hover:scale-110`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <BiSolidDownArrow className="w-8 h-8" />
          ) : (
            <HiMenu className="w-8 h-8" />
          )}
        </button>
      </div>

      <nav
        className={`md:hidden bg-[#1D254D] border-t border-[#2C56A0] transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-3 px-4 py-6 font-medium text-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={playHoverCue}
              onClick={() => handleNavClick(item.path, true)}
              className={`${getLinkClasses(item.path, true)} flex items-center gap-3`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>

  );
};

export default Header;
