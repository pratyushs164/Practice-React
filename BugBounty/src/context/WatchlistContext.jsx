import { useContext, createContext, useState } from "react";

const WatchlistContext = createContext({
  savedIssues: [],
  addWatchlist: () => {},
  removeWatchlist: () => {},
});

export const useWatchList = () => {
  return useContext(WatchlistContext);
};

export const WatchlistProvider = ({ children }) => {
  const [savedIssues, setSavedIssues] = useState([]);
  const addWatchlist = (issue) =>
    setSavedIssues((prev) =>
      prev.some((el) => el.id === issue.id) ? prev : [...prev, issue],
    );
  const removeWatchlist = (issue) =>
    setSavedIssues((prev) => prev.filter((el) => el !== issue));
  return (
    <WatchlistContext.Provider
      value={{ savedIssues, removeWatchlist, addWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
