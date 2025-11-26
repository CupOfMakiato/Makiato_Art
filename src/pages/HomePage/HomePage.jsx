import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../../layouts/MainLayout";
import LoadingOverlay from "../../components/Common/LoadingOverlay";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import bgMain from "../../assets/scug.jpg";
import bgBehind from "../../assets/tanuki.jpg";

import {
  viewAllListsByBoardId,
  viewAllCardsByListId,
  viewCardAttachments,
  viewCardById,
} from "../../api/trello-api";
import TrelloMarkdownRenderer from "../../utils/TrelloMarkdownRenderer";

const HomePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const nodeRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // FIX: setCurrentPath only once
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const lists = await viewAllListsByBoardId();
        const profileList = lists.find((list) =>
          list.name.toLowerCase().includes("homepage")
        );
        if (!profileList) throw new Error("Profile list not found");

        const cards = await viewAllCardsByListId(profileList.id);
        if (!cards || cards.length === 0)
          throw new Error("No cards found in Profile list");

        const [profileCard, cardNameRef, cardDescRef, cardBioRef] = cards;
        const attachments = await viewCardAttachments(profileCard.id);
        const cardName = await viewCardById(cardNameRef.id);
        const cardDesc = await viewCardById(cardDescRef.id);
        const cardBio = await viewCardById(cardBioRef.id);

        const profileImage = attachments.find(
          (att) => att.mimeType && att.mimeType.startsWith("image/")
        );

        setProfileData({
          name: cardName?.desc || "N/A name",
          description: cardDesc?.desc || "N/A desc",
          bio: cardBio?.desc || "N/A bio",
          imageUrl: profileImage ? profileImage.url : null,
        });
        setLoading(false);
      } catch (err) {
        setError(`Failed to load profile information: ${err.message}`);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);
  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  // Cleanup interval on component unmount
  return () => clearInterval(timer);
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
      <div className="flex-grow py-12 px-4 flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-3xl">
          <div ref={nodeRef}>
            {/* Main Card with Background Image Overlay */}
            <div className="bg-[#22232b] rounded-2xl shadow-2xl overflow-hidden relative">
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

              <div className="px-5 py-2 flex items-center gap-3 border-[#1E3E78] bg-[#1d254d]">
                <Header />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Text */}
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h1 className="text-5xl md:text-6xl font-black text-[#edf1ff] mb-2 tracking-tight">
                      <TrelloMarkdownRenderer content={profileData?.name} />
                    </h1>
                    <div className="text-base text-[#d1daff] mb-6 font-medium leading-relaxed">
                      <TrelloMarkdownRenderer content={profileData?.bio} />
                    </div>
                    <div className="text-base text-[#d1daff] mb-6 space-y-4">
                      <TrelloMarkdownRenderer
                        content={profileData?.description}
                      />
                    </div>
                    <div className="border-b-2 border-[#d1daff] my-6 opacity-50 border-dashed"></div>
                    {/* Current Time Display */}
                    <div className="flex items-center gap-2 text-[#d1daff]">
                    <p> My Local Time: </p>
                    <span className="text-lg font-medium">
                      {currentTime.toLocaleTimeString('en-US', {
                        timeZone: 'Asia/Bangkok',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center items-center order-1 md:order-2 hover:scale-105 transition-transform duration-500 ease-in-out">
                    <style>{`
                      @keyframes floatImage {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-2px); }
                      }
                      .floating-image {
                        animation: floatImage 3s ease-in-out infinite;
                      }
                    `}</style>
                    <div className="w-64 h-64 rounded-2xl overflow-hidden floating-image">
                      {profileData?.imageUrl ? (
                        <img
                          src={profileData.imageUrl}
                          alt={profileData.name}
                          className="w-full h-full object-cover pointer-events-none select-none hover:scale-105 transition-transform duration-500 ease-in-out"
                          draggable="false"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>
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

export default HomePage;