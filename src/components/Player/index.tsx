import { useAppSelector } from "../../store/helpers";
import { Song } from "../../store/types/SongControlTypes";
import Image from "../Image";
import "./index.scss";
import PlayerController from "./PlayerController";

const Player: React.FC<{}> = () => {
  const songState = useAppSelector((state) => state.songControls);

  let currentSong = songState.songs.find((song) => song.id === songState.currentSongId);

  if (!currentSong) {
    return <></>;
  }

  return (
    <div className='player'>
      <div className='player-content'>
        <Image imgSrc={`resources/covers/${currentSong.cover}`} className='player-content-cover' />
        <PlayerController {...currentSong} />
      </div>
    </div>
  );
};

export default Player;
