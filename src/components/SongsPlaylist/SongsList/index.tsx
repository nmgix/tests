import { Icon } from "../../Icon";
import Image from "../../Image";
import "./index.scss";

const SongListTrack: React.FC<{ song: Song; active: boolean; changeOptions: { liftUp: boolean; liftDown: boolean } }> =
  ({ song, active, changeOptions }) => {
    const trunicateWord = (word: string, length: number) => {
      let targetWord = word.split("");

      if (targetWord.length > length) {
        return targetWord.slice(0, length).join("") + "...";
      } else {
        return word;
      }
    };

    return (
      <li className='song-list-track'>
        <div className='song-list-track-order'>
          {changeOptions.liftUp ? (
            <Icon icon='arrow-up' color='white' size={{ width: "25px", height: "25px" }} />
          ) : (
            <></>
          )}
          {changeOptions.liftDown ? (
            <Icon icon='arrow-down' color='white' size={{ width: "25px", height: "25px" }} />
          ) : (
            <></>
          )}
        </div>
        <div className='song-list-track-content'>
          <button className='song-list-track-content-control'>
            {active ? (
              <Icon icon='pause' color='black' size={{ width: "20px", height: "20px" }} />
            ) : (
              <Icon icon='play' color='black' size={{ width: "20px", height: "20px" }} />
            )}
          </button>
          <div className='song-list-track-content-info'>
            <Image
              imgSrc={`resources/covers/${song.cover}`}
              fallBackSrc='resources/utils/fallback-cover.svg'
              className='song-list-track-content-cover'
            />
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

export type Song = {
  id: number;
  info: {
    name: string;
    author: string;
  };
  duration: number | string;
  cover: string;
};

const SongsList: React.FC<{ songs: Song[]; activeSong: number }> = ({ songs, activeSong }) => {
  return (
    <ul className='song-list'>
      {songs.map((song, i) => (
        <SongListTrack
          song={song}
          active={song.id === activeSong}
          key={song.info.name}
          changeOptions={{ liftUp: i !== 0, liftDown: i !== songs.length - 1 }}
        />
      ))}
    </ul>
  );
};

export default SongsList;
