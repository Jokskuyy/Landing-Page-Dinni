import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
      aria-label={`Switch to ${language === "id" ? "English" : "Indonesian"}`}
    >
      <i className="fas fa-globe"></i>
      <span className="uppercase">{language}</span>
    </button>
  );
};

export default LanguageSwitcher;
