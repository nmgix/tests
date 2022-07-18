import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Player from "./components/Player";
import SongPlaylist from "./components/SongsPlaylist";
import "./index.scss";
import store from "./store/store";
import { Song } from "./store/types/SongControlTypes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    {/* <Player {{}} /> */}
    <SongPlaylist />
  </Provider>
);
