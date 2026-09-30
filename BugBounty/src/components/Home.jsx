import LanguageCard from "./LanguageCard";

function Home() {
  const languages = ["Python", "Javascript", "C++", "Java"];

  return (
    <>
      <div className="">
        <div className="flex flex-wrap  gap-8 px-6 pt-10 items-center justify-around">
          {languages.map((lang) => {
            return <LanguageCard lang={lang} key={lang} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
