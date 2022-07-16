import ReactDOM from "react-dom/client";
import Player from "./components/Player";
import SongPlaylist from "./components/SongsPlaylist";
import { Song } from "./components/SongsPlaylist/SongsList";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const currentSong: Song = {
  id: 0,
  cover: "jnatun-dioma.jpg",
  duration: "2.36",
  info: {
    author: "Jnatun",
    name: "Dioma",
  },
};

root.render(
  <>
    <Player {...currentSong} />
    <SongPlaylist />
  </>
);
