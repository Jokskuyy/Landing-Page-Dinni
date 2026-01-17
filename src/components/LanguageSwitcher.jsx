import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 px-1 py-1 bg-gray-100 rounded-lg border border-gray-200">
      <button
        onClick={() => language === "en" && toggleLanguage()}
        className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${
          language === "id"
            ? "bg-white text-primary-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="Switch to Indonesian"
      >
        ID
      </button>
      <button
        onClick={() => language === "id" && toggleLanguage()}
        className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${
          language === "en"
            ? "bg-white text-primary-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
