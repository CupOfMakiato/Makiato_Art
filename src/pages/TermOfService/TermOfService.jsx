import React, { useState, useEffect, useRef } from "react";
import {
  viewAllListsByBoardId,
  viewAllCardsByListId,
  viewCardById,
} from "../../api/trello-api";
import MainLayout from "../../layouts/MainLayout";
import LoadingOverlay from "../../components/Common/LoadingOverlay";
import TrelloMarkdownRenderer from "../../utils/TrelloMarkdownRenderer";
import Header from "../../components/Common/Header";
import bgMain from "../../assets/scug.jpg";
import bgBehind from "../../assets/tanuki.jpg";

const TermOfService = () => {
  const [termOfServiceData, setTermOfServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    const fetchTermOfServiceData = async () => {
      try {
        setLoading(true);

        const lists = await viewAllListsByBoardId();
        const termOfServiceList = lists.find((list) =>
          list.name.toLowerCase().includes("termofservice")
        );

        if (!termOfServiceList) {
          throw new Error("Term of Service list not found");
        }

        const cards = await viewAllCardsByListId(termOfServiceList.id);

        if (!cards || cards.length === 0) {
          throw new Error("No cards found in Term of Service list");
        }

        // Fetch details for all cards
        const cardsWithDetails = await Promise.all(
          cards.map(async (card) => {
            try {
              const cardDetails = await viewCardById(card.id);
              return {
                id: cardDetails.id,
                name: cardDetails.name,
                description: cardDetails.desc || "N/A",
              };
            } catch (err) {
              console.error(`Error fetching card ${card.id}:`, err);
              return null;
            }
          })
        );

        // Filter out any null values from failed fetches
        const validCards = cardsWithDetails.filter((card) => card !== null);
        setTermOfServiceData(validCards);

        setLoading(false);
      } catch (err) {
        console.error("Error loading term of service data:", err);
        setError(`Failed to load term of service information: ${err.message}`);
        setLoading(false);
      }
    };

    fetchTermOfServiceData();
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
                {loading ? (
                  <LoadingOverlay />
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-[#EDF1FF] text-lg">{error}</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                      <h1 className="text-4xl md:text-5xl font-black text-[#EDF1FF] mb-4 tracking-tight">
                        Terms of Service
                      </h1>
                      <div className="border-b-2 border-[#d1daff] opacity-50 border-dashed"></div>
                      <p className="mt-3 text-base text-[#EDF1FF] leading-relaxed">
                        By commissioning any artwork from me{" "}
                        <span className="font-bold">(the artist)</span>, you{" "}
                        <span className="font-bold">(the commissioner)</span> are stating that you 
                        have read and agree to the following conditions. I will work under the 
                        assumption that you agreed to them.
                      </p>

                    </div>

                    {/* Term of Service Sections */}
                    {termOfServiceData.map((section, index) => (
                      <div key={section.id} className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#EDF1FF] mb-4 text-center">
                          {section.name}
                        </h2>
                        <div className="text-base text-[#d1daff] leading-relaxed space-y-4">
                          <TrelloMarkdownRenderer content={section.description} />
                        </div>
                        
                        {/* Divider between sections (except for the last one) */}
                        {index < termOfServiceData.length - 1 && (
                          <div className="border-b border-[#d1daff] opacity-30 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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

export default TermOfService;
