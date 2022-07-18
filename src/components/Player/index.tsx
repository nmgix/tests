import { Song } from "../../store/types/SongControlTypes";
import Image from "../Image";
import "./index.scss";
import PlayerController from "./PlayerController";

const Player: React.FC<Song> = (song) => {
  return (
    <div className='player'>
      <div className='player-content'>
        <Image imgSrc={`resources/covers/${song.cover}`} className='player-content-cover' />
        <PlayerController {...song} />
      </div>
    </div>
  );
};

export default Player;
