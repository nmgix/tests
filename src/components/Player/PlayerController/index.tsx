import { PlayingState } from "..";
import { Icon } from "../../Icon";
import { Song } from "../../SongsPlaylist/SongsList";
import "./index.scss";

const PlayerController: React.FC<Song & PlayingState> = ({ duration, id, info, currentTime, volume, playing }) => {
  const toNormalCurrentTime = (currentTime: number) => {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime - minutes * 60;
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='player-content-controller'>
      <div className='player-content-controller-header song-list-track-content-info-description'>
        <h1 className='song-list-track-content-info-description-name'>{info.name}</h1>
        <h4 className='song-list-track-content-info-description-author'>{info.author}</h4>
      </div>
      <div className='player-content-controller-timeline'>
        <div className='player-content-controller-timeline-waveform'></div>
        <span className='player-content-controller-timeline-time'>{`${toNormalCurrentTime(
          currentTime
        )} / ${duration}`}</span>
      </div>
      <div className='player-content-controller-controls song-controller'>
        <button>
          <Icon color='white' icon='skip-backward' size={{ width: "100%", height: "100%" }} />
        </button>
        <button>
          <Icon color='white' icon={playing ? "pause" : "play"} size={{ width: "100%", height: "100%" }} />
        </button>
        <button>
          <Icon color='white' icon='skip-forward' size={{ width: "100%", height: "100%" }} />
        </button>
      </div>
      <input className='player-content-controller-volume' type={"range"} min={0} max={100} value={volume} />
    </div>
  );
};

export default PlayerController;
