import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RepoCard from "./RepoCard";

function LangRepo() {
  const { lang } = useParams();
  const [repo, setRepo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRepo = async function () {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=language:${lang.toLowerCase()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repository");
        }
        const data = await response.json();
        setRepo(data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [lang]);
  console.log(repo);

  if (error) {
    return (
      <div className="bg-red-400">
        <p> Error: {error.message}</p>
      </div>
    );
  }

  return loading ? (
    <h1>Loading Repos...</h1>
  ) : (
    <div className="flex flex-wrap  gap-8 px-6 pt-10 items-center justify-around">
      {repo?.items?.map((repository) => (
        <RepoCard repository={repository} key={repository.id}></RepoCard>
      ))}
    </div>
  );
  // ) : (
  //   repo.items.map((repository) => (
  //     <div>
  //       <div className="w-full h-20 m-5 p-3 text-2xl bg-amber-100">Hi</div>
  //     </div>
  //   ))
  // );
}

export default LangRepo;
