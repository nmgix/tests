import { useAppSelector } from "../../store/helpers";
import Image from "../Image";
import "./index.scss";
import PlayerController from "./PlayerController";

const Player: React.FC<{}> = () => {
  const songState = useAppSelector((state) => state.songControls);

  let currentSong = songState.songs.find((song) => song.id === songState.currentSongId);

  if (!currentSong) {
    return <></>;
  }
  let songBefore =
    songState.songs.indexOf(currentSong) === 0
      ? songState.songs[songState.songs.length - 1]
      : songState.songs.find((song, index) => index === songState.songs.indexOf(currentSong!) - 1);
  let songAfter =
    songState.songs.indexOf(currentSong) === songState.songs.length - 1
      ? songState.songs[0]
      : songState.songs.find((song, index) => index === songState.songs.indexOf(currentSong!) + 1);

  return (
    <div className='player'>
      <div className='player-content'>
        <Image imgSrc={`resources/covers/${currentSong.cover}`} className='player-content-cover' />
        <PlayerController {...currentSong} songBefore={songBefore} songAfter={songAfter} />
      </div>
    </div>
  );
};

export default Player;
