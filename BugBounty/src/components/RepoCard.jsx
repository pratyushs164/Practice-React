import React from "react";
import { Link } from "react-router-dom";

function RepoCard({ repository }) {
  return (
    <div className="w-full max-w-sm">
      <div className="h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        {/* Repository name */}
        <div className="mb-3">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-gray-900 hover:text-blue-600"
          >
            {repository.name}
          </a>

          <a
            href={repository.owner.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm text-gray-500 hover:text-blue-600"
          >
            {repository.full_name.split("/")[0]}
          </a>
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-600">
          {repository.description || "No description available."}
        </p>

        {/* Language */}
        {repository.language && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
            <span>{repository.language}</span>
          </div>
        )}

        {/* Stats */}
        <div className="mb-5 flex gap-5 text-sm text-gray-600">
          <span>⭐ {repository.stargazers_count}</span>
          <span>🍴 {repository.forks_count}</span>
          <span>● {repository.open_issues_count} issues</span>
        </div>

        {/* Button */}
        <Link
          to={`/repo/${repository.full_name}/issues`}
          className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          View Issues →
        </Link>
      </div>
    </div>
  );
}

export default RepoCard;
