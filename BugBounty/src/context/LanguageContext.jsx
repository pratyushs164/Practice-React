import { useContext, createContext, useState } from "react";

const LanguageContext = createContext({
  selectedLanguage: "",
  chooseLang: function () {},
});

export const LanguageProvider = function ({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  return <LanguageContext.Provider>{children}</LanguageContext.Provider>;
};

export const useLanguage = function () {
  return useContext(LanguageContext);
};
