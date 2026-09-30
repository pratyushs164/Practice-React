import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { LanguageProvider } from "./context/LanguageContext";
import LangRepo from "./components/LangRepo";
import LanguageCard from "./components/LanguageCard";

function App() {
  return (
    <>
      <LanguageProvider
        value={{ selectedLanguage, setSelectedLanguage, chooseLang }}
      >
        {selectedLanguage ? <LangRepo /> : <Home />}
      </LanguageProvider>
    </>
  );
}

export default App;
