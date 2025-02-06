import SongController from "./SongsController";
import SongsList from "./SongsList";
import "./index.scss";

const SongPlaylist = () => {
  return (
    <div className='song-playlist'>
      <SongController />
      <SongsList />
    </div>
  );
};

export default SongPlaylist;
