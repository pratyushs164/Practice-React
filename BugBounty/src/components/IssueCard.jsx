import React from "react";
import { useWatchList, WatchlistProvider } from "../context/WatchlistContext";

function IssueCard({ issue }) {
  const { savedIssues, addWatchlist, removeWatchlist } = useWatchList();
  return (
    <div className="w-full max-w-md">
      <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        {/* Issue number */}
        <div className="mb-2 text-sm font-medium text-gray-500">
          #{issue.number}
        </div>

        {/* Issue title */}
        <h2 className="mb-3 text-lg font-semibold text-gray-900 line-clamp-2">
          {issue.title}
        </h2>

        {/* Description */}
        <p className="mb-4 text-sm leading-6 text-gray-600 line-clamp-3">
          {issue?.body
            ? issue.body.slice(0, 100) + "..."
            : "No Description Provided"}
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            View Issue
          </a>

          {savedIssues.some((el) => el.id === issue.id) ? (
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              onClick={() => removeWatchlist(issue)}
            >
              Remove From Watchlist
            </button>
          ) : (
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              onClick={() => addWatchlist(issue)}
            >
              Add to Watchlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
