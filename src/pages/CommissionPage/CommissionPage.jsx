import React, { useState, useEffect, useRef } from "react";
import {
  viewAllListsByBoardId,
  viewAllCardsByListId,
  viewCardAttachments,
} from "../../api/trello-api";
import MainLayout from "../../layouts/MainLayout";
import LoadingOverlay from "../../components/Common/LoadingOverlay";
import closeSound from "../../assets/click_close.mp3";
import clickSound from "../../assets/collapsible_open.mp3";
import Header from "../../components/Common/Header";
import bgMain from "../../assets/scug.jpg";
import bgBehind from "../../assets/tanuki.jpg";
import TrelloMarkdownRenderer from "../../utils/TrelloMarkdownRenderer";
import { Howl } from "howler";

const CommissionPage = () => {
  const [commissionTiers, setCommissionTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const clickSoundRef = useRef(null);
  const closeSoundRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  

  // Initialize audio in useEffect
  useEffect(() => {
    clickSoundRef.current = new Howl({
      src: [clickSound],
      volume: 0.4,
      html5: true,
      preload: true,
    });

    closeSoundRef.current = new Howl({
      src: [closeSound],
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

    // Cleanup function
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, markAudioReady);
      });
      if (clickSoundRef.current) clickSoundRef.current.unload();
      if (closeSoundRef.current) closeSoundRef.current.unload();
    };
  }, []); // Empty dependency array - run once on mount

  useEffect(() => {
  const fetchPortfolioData = async () => {
    try {
      setLoading(true);

      const lists = await viewAllListsByBoardId();

      const galleryList = lists.find((list) =>
        list.name.toLowerCase().includes("commission")
      );

      if (!galleryList) {
        throw new Error("Gallery list not found");
      }

      const cards = await viewAllCardsByListId(galleryList.id);

      const portfolioData = await Promise.all(
        cards.map(async (card) => {
          try {
            const attachments = await viewCardAttachments(card.id);
            const images = attachments.filter(
              (att) => att.mimeType && att.mimeType.startsWith("image/")
            );

            return {
              id: card.id,
              title: card.name, // This will be your tier name
              description: card.desc,
              images: images.map((img) => ({
                id: img.id,
                url: img.url,
                name: img.name,
                fileName: img.fileName,
                previews: img.previews || [],
              })),
            };
          } catch (err) {
            console.error(
              `Error fetching attachments for card ${card.id}:`,
              err
            );
            return null;
          }
        })
      );

      // Filter out cards without images
      const validTiers = portfolioData.filter(
        (item) => item && item.images.length > 0
      );

      setCommissionTiers(validTiers);
      setLoading(false);
    } catch (err) {
      console.error("Error loading portfolio:", err);
      setError(`Failed to load gallery: ${err.message}`);
      setLoading(false);
    }
  };

  fetchPortfolioData();

    // Disable right-click on entire page
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable specific keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return false;
      }
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current && audioReady) {
      clickSoundRef.current.play();
    }
  };

  const playCloseSound = () => {
    if (closeSoundRef.current && audioReady) {
      closeSoundRef.current.play();
    }
  };

  const openLightbox = (image) => {
    playClickSound();
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    playCloseSound();
    setSelectedImage(null);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

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
          {/* Main Card with Background Image Overlay */}
          <div className="bg-[#22232b] rounded-2xl shadow-2xl overflow-hidden relative">
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

            {/* Portfolio Grid */}
<main className="container mx-auto px-6 py-12">
  <h1 className="text-4xl md:text-5xl font-black text-[#edf1ff] mb-4 tracking-tight text-center">
                        Commission Info
                      </h1>
  {commissionTiers.length === 0 && !loading ? (
    <div className="text-center py-20">
      <p className="text-gray-500 text-lg">Gallery is empty</p>
    </div>
  ) : (
    <div className="space-y-16">
      <div className="border-b-2 border-[#EDF1FF] my-6 border-dashed opacity-30"></div>
      {/* <p className="mb-8 text-center mt-2 text-[#EDF1FF]">
        Clicking on arts to view them :3
      </p> */}
      {commissionTiers.map((tier) => (
        
        <div key={tier.id} className="tier-section">
          {/* Tier Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              {tier.title}
            </h2>
            {tier.description && (
              <div className="text-[#D1DAFF] max-w-3xl mx-auto">
                <TrelloMarkdownRenderer content={tier.description} />
              </div>
            )}
          </div>

          {/* Tier Images Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {tier.images.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid cursor-zoom-in group mb-6"
                onClick={() => openLightbox(image)}
                onContextMenu={(e) => e.preventDefault()}
              >
                <div className="relative bg-gray-100 overflow-hidden rounded-lg transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-auto object-contain pointer-events-none"
                    loading="lazy"
                    draggable="false"
                    onDragStart={handleDragStart}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      MozUserSelect: "none",
                      msUserSelect: "none",
                      WebkitTouchCallout: "none",
                      WebkitUserDrag: "none",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Divider between tiers */}
          {tier.id !== commissionTiers[commissionTiers.length - 1].id && (
            <div className="border-b-2 border-[#EDF1FF] my-6 border-dashed opacity-30 mt-9"></div>
          )}
        </div>
      ))}
    </div>
  )}
  <div className="border-b-2 border-[#EDF1FF] my-6 border-dashed opacity-30 mt-9"></div>
  <h2 className="text-3xl text-center font-bold text-white mb-3">
              Interested in something else?
            </h2>
  <p className="text-[#D1DAFF] max-w-3xl mx-auto text-center">Interested in something else?
If you idea doesn't land any of these tiers feel free to ask me about it!
I have icons, chibis, fullbody drawings etc
that you can find on my socials that aren't listed here.</p>

</main>


          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={closeLightbox}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* <button
            className="absolute top-6 right-6 rounded-lg border border-transparent px-5 py-2.5 text-base font-medium font-inherit bg-[#141414] cursor-pointer transition-colors duration-[250ms]"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button> */}
          <div
            className="max-w-6xl max-h-full relative cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-w-full max-h-[80vh] cursor-zoom-out object-contain mx-auto select-none"
              draggable="false"
              onDragStart={handleDragStart}
              onClick={closeLightbox}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none",
                WebkitUserDrag: "none",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none cursor-zoom-out"
              onContextMenu={(e) => e.preventDefault()}
            />
            {/* <div className="text-white text-center mt-6">
              <h3 className="text-2xl font-light mb-2">
                {selectedImage.name}
              </h3>
              {selectedImage.cardDescription && (
                <p className="text-gray-300">
                  {selectedImage.cardDescription}
                </p>
              )}
            </div> */}
          </div>
        </div>
      )}

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

export default CommissionPage;
