import ReactDOM from "react-dom/client";
import Player from "./components/Player";
import SongPlaylist from "./components/SongsPlaylist";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    <Player />
    <SongPlaylist />
  </>
);
