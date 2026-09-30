import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IssueCard from "./IssueCard";

function RepoIssues() {
  const { owner, repoName } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchIssues = async function () {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}/issues?state=open`,
        );

        if (!response.ok) {
          throw new Error("Error in fetching response from issues API");
        }

        const data = await response.json();
        setIssues(data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [owner, repoName]);

  if (error) {
    return (
      <div className="bg-red-400">
        <p> Error: {error.message}</p>
      </div>
    );
  }

  return loading ? (
    <h1>Loading Issues...</h1>
  ) : (
    <div className="flex flex-wrap  gap-8 px-6 pt-10 items-center justify-around">
      {issues?.map((issue) => (
        <IssueCard issue={issue} key={issue.id}></IssueCard>
      ))}
    </div>
  );
}

export default RepoIssues;
