import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

function LanguageCard({ lang }) {
  return (
    <div>
      <div className="bg-amber-100 p-4 w-64 h-64 flex flex-col items-center justify-center gap-6">
        <p>{lang}</p>

        <Link
          to={`/repo/${lang.toLowerCase()}`}
          className="bg-amber-950 text-white px-4 py-2 rounded"
        >
          {" "}
          Explore Repos
        </Link>
      </div>
    </div>
  );
}

export default LanguageCard;
