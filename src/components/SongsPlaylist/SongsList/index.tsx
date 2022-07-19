import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/helpers";
import { changeCurrentSong, changeSongPosition } from "../../../store/reducers/songControlReducer";
import { Song } from "../../../store/types/SongControlTypes";
import { Icon } from "../../Icon";
import Image from "../../Image";
import "./index.scss";

const trunicateWord = (word: string, length: number) => {
  let targetWord = word.split("");

  if (targetWord.length > length) {
    return targetWord.slice(0, length).join("") + "...";
  } else {
    return word;
  }
};

const SongListTrack: React.FC<{
  song: Song;
  active: boolean;
  changeOptions: { liftUp: boolean; liftDown: boolean };
  current: boolean;
}> = ({ song, active, changeOptions, current }) => {
  const dispatch = useDispatch();

  return (
    <li className='song-list-track'>
      <div className='song-list-track-order'>
        {changeOptions.liftUp ? (
          <button onClick={() => dispatch(changeSongPosition({ songId: song.id, exchangeWithAbove: true }))}>
            <Icon icon='arrow-up' color='white' size={{ width: "25px", height: "25px" }} />
          </button>
        ) : (
          <></>
        )}
        {changeOptions.liftDown ? (
          <button onClick={() => dispatch(changeSongPosition({ songId: song.id, exchangeWithAbove: false }))}>
            <Icon icon='arrow-down' color='white' size={{ width: "25px", height: "25px" }} />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className='song-list-track-content'>
        <button
          className='song-list-track-content-control'
          onClick={() => dispatch(changeCurrentSong(current ? {} : { songId: song.id }))}>
          {current && active ? (
            <Icon icon='pause' color='black' size={{ width: "20px", height: "20px" }} />
          ) : (
            <Icon icon='play' color='black' size={{ width: "20px", height: "20px" }} />
          )}
        </button>
        <div className='song-list-track-content-info'>
          <Image imgSrc={`resources/covers/${song.cover}`} className='song-list-track-content-cover' />
          <div className='song-list-track-content-info-description'>
            <h4 className='song-list-track-content-info-description-name'>{trunicateWord(song.info.name, 10)}</h4>
            <h5 className='song-list-track-content-info-description-author'>{trunicateWord(song.info.author, 10)}</h5>
          </div>
          {/* мб duration будет считаться через функцию */}
        </div>
        <h3 className='song-list-track-content-duration'>{trunicateWord(song.duration.toString(), 7)}</h3>
      </div>
    </li>
  );
};

const SongsList: React.FC<{}> = () => {
  const playerState = useAppSelector((state) => state.playerControls);
  const songState = useAppSelector((state) => state.songControls);

  return (
    <ul className='song-list'>
      {songState.songs.map((song, i) => (
        <SongListTrack
          song={song}
          current={song.id === songState.currentSongId}
          active={playerState.playing}
          key={song.info.name}
          changeOptions={{ liftUp: i !== 0, liftDown: i !== songState.songs.length - 1 }}
        />
      ))}
    </ul>
  );
};

export default SongsList;
