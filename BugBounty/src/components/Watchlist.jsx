import React from "react";
import { useWatchList } from "../context/WatchlistContext";
import IssueCard from "./IssueCard";

function Watchlist() {
  const { savedIssues } = useWatchList();
  if (savedIssues.length) {
    return savedIssues.map((issue) => (
      <div>
        <IssueCard issue={issue} key={issue.id}></IssueCard>
      </div>
    ));
  } else {
    return <div> Nothing in playlist</div>;
  }
}

export default Watchlist;
