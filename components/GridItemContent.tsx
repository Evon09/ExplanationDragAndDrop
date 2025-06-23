import React, { useState } from "react"; // Added useState for local component state
import { PALETTE_ITEMS } from "../constants";

import originalImage from "./../img/Original.png";
import explanationImage from "./../img/Explanation.png";

interface GridItemContentProps {
  itemId: string;
  paletteItemId: string;
  onRemoveItem: (itemId: string) => void;
  isMiniature?: boolean;
}

const GridItemContent = ({
  itemId,
  paletteItemId,
  onRemoveItem,
  isMiniature = false,
}: GridItemContentProps): React.ReactNode => {
  const itemDetails = PALETTE_ITEMS.find((p) => p.id === paletteItemId);
  const itemName = itemDetails ? itemDetails.name : "Unknown Item";

  // Local state for interactive components
  const [currentExplanationIndex, setCurrentExplanationIndex] = useState(0);
  const totalExplanations = 5; // Example total
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>(
    null
  );
  const stakeholders = ["User", "Developer", "Manager", "Client"];

  let bgColor = "bg-sky-600";
  let textColor = "text-white";

  // Color logic for components
  switch (paletteItemId) {
    case "image":
      bgColor = "bg-emerald-600";
      break;
    case "chart":
      bgColor = "bg-amber-500";
      break;
    case "card":
      bgColor = "bg-purple-600";
      break;
    case "header":
      bgColor = "bg-slate-700";
      break;
    case "button":
      bgColor = "bg-rose-500";
      break;
    // Original New component colors
    case "explanationText":
      bgColor = "bg-[#D9D9D9]";
      textColor = "text-black";
      break;
    case "originalImage":
      bgColor = "bg-[#D9D9D9]";
      break;
    case "explanationImage":
      bgColor = "bg-[#D9D9D9]";
      textColor = "text-gray-800";
      break;

    // Explanation Selectors
    case "explanationSelector":
      bgColor = "bg-[#D9D9D9]";
      break;
    case "explanationSelectorDots":
      bgColor = "bg-[#D9D9D9]";
      break;
    case "explanationSelectorMinimal":
      bgColor = "bg-[#D9D9D9]";
      break;

    // Stakeholder Selectors
    case "stakeholderSelector":
      bgColor = "bg-[#D9D9D9]";
      break;
    case "stakeholderSelectorDropdown":
      bgColor = "bg-[#D9D9D9]";
      textColor = "text-gray-800";
      break; // Dropdown needs text contrast
    case "stakeholderSelectorRadio":
      bgColor = "bg-[#D9D9D9]";
      break;
    case "stakeholderSelectorTabs":
      bgColor = "bg-[#D9D9D9]";
      break;

    default:
      bgColor = "bg-sky-600"; // Default for text and unknown
  }

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onRemoveItem(itemId);
  };

  const handlePrevExplanation = () => {
    setCurrentExplanationIndex((prev) => Math.max(0, prev - 1));
  };
  const handleNextExplanation = () => {
    setCurrentExplanationIndex((prev) =>
      Math.min(totalExplanations - 1, prev + 1)
    );
  };

  if (isMiniature) {
    let miniatureContent;
    const iconBaseClass = `w-8 h-8 md:w-10 md:h-10 opacity-80 ${
      textColor === "text-gray-800" ? "text-gray-700" : "text-white"
    }`;
    const miniatureBgColor = bgColor;

    switch (paletteItemId) {
      case "text":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        );
        break;
      case "image":
      case "originalImage":
      case "explanationImage":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        );
        break;
      case "chart":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
        );
        break;
      case "card":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        );
        break;
      case "header":
        miniatureContent = (
          <p
            className={`text-lg font-bold ${
              iconBaseClass.includes("text-gray-700")
                ? "text-gray-700"
                : "text-white"
            }`}
          >
            Aa
          </p>
        );
        break;
      case "button":
        miniatureContent = (
          <div
            className={`px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm bg-black/25 rounded-md shadow-md ${
              iconBaseClass.includes("text-gray-700")
                ? "text-gray-700"
                : "text-white"
            }`}
          >
            BTN
          </div>
        );
        break;
      case "explanationText":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l-3-3m0 0l3-3m-3 3h12"
            />
          </svg>
        );
        break;
      case "explanationSelector":
      case "explanationSelectorDots":
      case "explanationSelectorMinimal":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3.75h9m-9 3.75h.008M4.5 12h.008M4.5 15.75h.008M4.5 19.5h.008M3 5.25h18A2.25 2.25 0 0123.25 7.5v10.5A2.25 2.25 0 0121 20.25H3A2.25 2.25 0 01.75 18V7.5A2.25 2.25 0 013 5.25zM15.75 4.5l-3 3-3-3"
            />
          </svg>
        );
        break;
      case "stakeholderSelector":
      case "stakeholderSelectorTabs":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.247-4.508A5.982 5.982 0 0018.75 7.5a5.982 5.982 0 00-1.5-.247m0 0A5.98 5.98 0 0013.5 9H9.75A5.98 5.98 0 006 11.25m6.75-2.25C11.166 9 9.75 7.525 9.75 6S11.166 3 12.75 3s3 1.525 3 3c0 .32-.031.633-.09.932m0 0A5.98 5.98 0 0018.75 9H13.5A5.98 5.98 0 006 7.5m6.75 6C11.166 13.5 9.75 14.975 9.75 16.5S11.166 19.5 12.75 19.5s3-1.525 3-3c0-.32-.031.633-.09.932m0 0A5.98 5.98 0 0018.75 13.5H13.5A5.98 5.98 0 006 14.975"
            />
          </svg>
        );
        break;
      case "stakeholderSelectorDropdown":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
            <rect
              x="3"
              y="11"
              width="18"
              height="2.5"
              rx="1"
              ry="1"
              className="opacity-50"
            />
          </svg>
        );
        break;
      case "stakeholderSelectorRadio":
        miniatureContent = (
          <svg
            className={iconBaseClass}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h8.25M8.25 12h5.25M8.25 17.25h8.25"
            />
            <circle cx="5" cy="7" r="1.5" />
            <circle
              cx="5"
              cy="12"
              r="1.5"
              className="opacity-50 fill-current"
            />
            <circle cx="5" cy="17" r="1.5" />
          </svg>
        );
        break;
      default:
        miniatureContent = (
          <p
            className={`text-sm p-1 ${
              iconBaseClass.includes("text-gray-700")
                ? "text-gray-700"
                : "text-white"
            }`}
          >
            {itemName.substring(0, 3)}
          </p>
        );
    }
    return (
      <div
        className={`w-full h-full ${miniatureBgColor} ${
          textColor === "text-gray-800" && paletteItemId !== "explanationImage"
            ? "text-gray-800"
            : textColor
        } flex flex-col items-center justify-center p-1 md:p-2 text-center overflow-hidden select-none`}
      >
        {miniatureContent}
      </div>
    );
  }

  // Full content rendering for items on the grid
  return (
    <div
      className={`w-full h-full ${bgColor} ${textColor} flex flex-col items-stretch justify-start transition-all duration-150 ease-in-out relative`}
    >
      <button
        onClick={handleRemove}
        className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
        aria-label="Remove item"
        title="Remove item"
      >
        &times;
      </button>

      <div className="flex-grow flex flex-col items-center justify-start w-full overflow-auto p-2.5 rounded-[5px]">
        {" "}
        {/* Added pt-6 for remove button space */}
        {/* Content for different palette item types */}
        {paletteItemId === "image" && (
          <div className="mt-1 w-full flex-grow overflow-hidden rounded-sm">
            <img
              src={`https://picsum.photos/seed/${itemId}/400/300`}
              alt={itemName}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        )}
        {paletteItemId === "chart" && (
          <div className="mt-1 w-full flex-grow text-xs text-gray-200/80 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-1/2 w-1/2 opacity-60"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
        )}
        {paletteItemId === "button" && (
          <button
            className={`mt-2 px-3 py-1 text-xs bg-black/20 hover:bg-black/30 rounded shadow transition-all ${textColor}`}
          >
            Action
          </button>
        )}
        {paletteItemId === "header" && (
          <p
            className={`text-base md:text-lg font-bold mt-1 text-center w-full truncate px-1 ${textColor}`}
          >
            Section Title
          </p>
        )}
        {paletteItemId === "text" && (
          <p
            className={`text-xs ${
              textColor === "text-gray-800"
                ? "text-gray-700"
                : "text-gray-200/90"
            } mt-1 text-left p-1`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        )}
        {paletteItemId === "card" && (
          <div
            className={`text-xs ${
              textColor === "text-gray-800"
                ? "text-gray-700"
                : "text-gray-200/90"
            } mt-1 text-center p-1`}
          >
            <p className="font-medium">Information Card</p>
            <p>Details about something important.</p>
          </div>
        )}
        {paletteItemId === "explanationText" && (
          <p
            className={`text-sm ${textColor} mt-1 text-left p-1 leading-relaxed`}
          >
            This component is designed to provide a detailed explanation. You
            can include multiple paragraphs, lists, or any other textual content
            needed to clarify a concept or feature. Ensure the text is clear,
            concise, and easy to understand for the target audience.
          </p>
        )}
        {paletteItemId === "originalImage" && (
          <div className="mt-1 w-full flex-grow overflow-hidden rounded-sm bg-black/10">
            <img
              src={originalImage}
              alt={`${itemName} - Original`}
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>
        )}
        {paletteItemId === "explanationImage" && (
          <div className="mt-1 w-full flex-grow overflow-hidden rounded-sm bg-black/10">
            <img
              src={explanationImage}
              alt={`${itemName} - Explanation`}
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>
        )}
        {/* Explanation Selectors */}
        {paletteItemId === "explanationSelector" && (
          <div
            className={` w-full max-w-md mx-auto flex flex-col items-center justify-center p-2 space-y-2 text-sm overflow-hidden ${
              textColor === "text-gray-800" ? "text-gray-700" : "text-gray-100"
            }`}
            style={{ maxHeight: "100%" }} // Garante que o componente não tente passar da altura disponível
          >
            <p className="text-center">
              Explanation {currentExplanationIndex + 1} / {totalExplanations}
            </p>

            <div className="flex flex-wrap justify-center gap-2 w-full">
              <button
                onClick={handlePrevExplanation}
                disabled={currentExplanationIndex === 0}
                className="px-4 py-2 text-xs bg-black/20 hover:bg-black/30 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextExplanation}
                disabled={currentExplanationIndex === totalExplanations - 1}
                className="px-4 py-2 text-xs bg-black/20 hover:bg-black/30 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {paletteItemId === "explanationSelectorDots" && (
          <div
            className={`mt-2 w-full max-w-md mx-auto flex flex-col items-center justify-center p-2 space-y-3 text-sm overflow-hidden ${
              textColor === "text-gray-800" ? "text-gray-700" : "text-gray-100"
            }`}
            style={{ maxHeight: "100%" }}
          >
            <p className="text-center">
              Explanation {currentExplanationIndex + 1} of {totalExplanations}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={handlePrevExplanation}
                disabled={currentExplanationIndex === 0}
                className="p-1 rounded-full bg-black/20 hover:bg-black/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex flex-wrap justify-center gap-1.5">
                {Array.from({ length: totalExplanations }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExplanationIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-150 ${
                      currentExplanationIndex === index
                        ? "bg-white scale-125"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to explanation ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextExplanation}
                disabled={currentExplanationIndex === totalExplanations - 1}
                className="p-1 rounded-full bg-black/20 hover:bg-black/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {paletteItemId === "explanationSelectorMinimal" && (
          <div
            className={`w-full h-[50px] flex items-center justify-between px-2 text-sm ${
              textColor === "text-gray-800" ? "text-gray-700" : "text-gray-100"
            }`}
          >
            <button
              onClick={handlePrevExplanation}
              disabled={currentExplanationIndex === 0}
              className="h-full px-2 text-xs hover:bg-black/20 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
              &lt; Prev
            </button>

            <p className="text-xs font-medium text-center leading-none">
              {currentExplanationIndex + 1} / {totalExplanations}
            </p>

            <button
              onClick={handleNextExplanation}
              disabled={currentExplanationIndex === totalExplanations - 1}
              className="h-full px-2 text-xs hover:bg-black/20 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next &gt;
            </button>
          </div>
        )}
        {/* Stakeholder Selectors */}
        {paletteItemId === "stakeholderSelector" && (
          <div
            className={`w-full h-full flex flex-col items-center justify-center px-2 py-1 space-y-2 text-sm text-center ${
              textColor === "text-gray-800" ? "text-gray-700" : "text-gray-100"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {stakeholders.map((sh) => (
                <button
                  key={sh}
                  onClick={() => setSelectedStakeholder(sh)}
                  className={`px-3 py-1.5 text-xs rounded shadow transition-all duration-150 whitespace-nowrap
          ${
            selectedStakeholder === sh
              ? "bg-white/30 ring-2 ring-white scale-105"
              : "bg-black/20 hover:bg-black/30"
          }`}
                >
                  {sh}
                </button>
              ))}
            </div>

            {selectedStakeholder && (
              <p className="text-xs italic break-words max-w-full">
                Selected: {selectedStakeholder}
              </p>
            )}
          </div>
        )}
        {paletteItemId === "stakeholderSelectorDropdown" && (
          <div className={`mt-2 w-full p-2 space-y-2 text-sm ${textColor}`}>
            <div className="relative">
              <select
                id={`sh-dropdown-${itemId}`}
                value={selectedStakeholder || ""}
                onChange={(e) => setSelectedStakeholder(e.target.value || null)}
                className="w-full appearance-none bg-black/20 hover:bg-black/30 text-white text-xs py-2 pl-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition"
              >
                <option value="">-- Select --</option>
                {stakeholders.map((sh) => (
                  <option key={sh} value={sh}>
                    {sh}
                  </option>
                ))}
              </select>

              {/* Ícone da seta */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white/60">
                <svg
                  className="w-4 h-4"
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
              </div>
            </div>

            {selectedStakeholder && (
              <p className="text-xs italic mt-1 text-gray-300">
                Selected: {selectedStakeholder}
              </p>
            )}
          </div>
        )}
        {paletteItemId === "stakeholderSelectorRadio" && (
          <div
            className={`mt-2 w-full p-2 space-y-2 text-sm ${
              textColor === "text-gray-800" ? "text-gray-700" : "text-gray-100"
            }`}
          >
            <div className="space-y-1.5">
              {stakeholders.map((sh) => (
                <label
                  key={sh}
                  className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer text-xs transition 
          ${
            selectedStakeholder === sh
              ? "bg-white/10 ring-1 ring-white/30"
              : "hover:bg-white/5"
          }`}
                >
                  <input
                    type="radio"
                    name={`stakeholder-radio-${itemId}`}
                    value={sh}
                    checked={selectedStakeholder === sh}
                    onChange={() => setSelectedStakeholder(sh)}
                    className="accent-blue-400 w-3.5 h-3.5 transition focus:ring-0"
                  />
                  <span className="truncate">{sh}</span>
                </label>
              ))}
            </div>

            {selectedStakeholder && (
              <p className="text-xs italic mt-1 text-gray-300">
                Selected: {selectedStakeholder}
              </p>
            )}
          </div>
        )}
        {paletteItemId === "stakeholderSelectorTabs" && (
          <div
            className={`w-full h-full flex items-center justify-center px-1 text-sm ${
              textColor === "text-gray-800" ? "text-gray-700" : "text-gray-100"
            }`}
          >
            <div className="w-full max-w-md flex rounded-md shadow-sm bg-black/20 p-0.5 overflow-hidden max-h-[50px]">
              {stakeholders.map((sh) => (
                <button
                  key={sh}
                  onClick={() => setSelectedStakeholder(sh)}
                  className={`flex-1 min-w-0 text-xs py-1 px-1 rounded-sm truncate transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-white/50
          ${
            selectedStakeholder === sh
              ? "bg-white/25 shadow"
              : "hover:bg-white/10"
          }`}
                  style={{ lineHeight: "1.1rem", height: "100%" }}
                >
                  {sh}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridItemContent;
