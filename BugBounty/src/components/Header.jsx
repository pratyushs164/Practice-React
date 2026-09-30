import { Link } from "react-router-dom";
import { useWatchList } from "../context/WatchlistContext";

function Header() {
  const { savedIssues } = useWatchList();
  return (
    <div>
      <div className="w-full bg-amber-100 flex justify-between ">
        <div>BugBounty</div>
        <Link to={"/watchlist"}>Watchlist: {`${savedIssues.length}`}</Link>
      </div>
    </div>
  );
}

export default Header;
