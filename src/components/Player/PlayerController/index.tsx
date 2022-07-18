import { useEffect, useState } from "react";
import { Icon } from "../../Icon";
import Waveform from "waveform-react";
import "./index.scss";
import { /*useAppDispatch,*/ useAppSelector } from "../../../store/helpers";
import { useDispatch } from "react-redux";
import { changePlaying } from "../../../store/reducers/playerControlReducer";
import { Song } from "../../../store/types/SongControlTypes";

type AudioType = {
  context: AudioContext | null;
  buffer: AudioBuffer | null;
  height: number; //150
  markerStyle: {
    color: string; //'white
    width: number; // 4
  };
  position: number; // 0
  responsive: boolean; //true
  showPosition: boolean; //false
  waveStyle: {
    animate: boolean; //false
    color: string; //'white'
    plot: "bar" | "line"; //'line'
    pointWidth: number; //1
  };
  width: number; //900
};

const toNormalCurrentTime = (currentTime: number) => {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime - minutes * 60;
  return `${minutes}:${seconds}`;
};
const getAudioBuffer = async (path: string, context: AudioContext): Promise<AudioBuffer> => {
  const response = await fetch(path);
  const audioData = await response.arrayBuffer();
  return new Promise((resolve, reject) => {
    context.decodeAudioData(audioData, (buffer) => {
      return resolve(buffer);
    });
  });
};
const getContext = () => {
  const context = new AudioContext();
  return context;
};

const PlayerController: React.FC<Song> = ({ duration, id, info }) => {
  const dispatch = useDispatch();
  // const { } = useAppDispatch()
  const { currentTime, playing, volume } = useAppSelector((store) => store.playerControls);

  const [audioState, setAudioState] = useState<AudioType>({
    context: null,
    buffer: null,
    height: 40,
    markerStyle: {
      color: "white",
      width: 4,
    },
    position: 0,
    responsive: true,
    showPosition: true,
    waveStyle: {
      animate: false,
      color: "white",
      plot: "line",
      pointWidth: 0.2,
    },
    width: 900,
  });

  useEffect(() => {
    setAudioState({ ...audioState, context: getContext() });
  }, []);

  const getFile = async (path = "resources/music/dioma.mp3") => {
    if (audioState.context) {
      const buffer = await getAudioBuffer(path, audioState.context);
      setAudioState({ ...audioState, buffer: buffer });
    }
  };

  useEffect(() => {
    getFile();
  }, [audioState.context]);

  return (
    <div className='player-content-controller'>
      <div className='player-content-controller-header song-list-track-content-info-description'>
        <h1 className='song-list-track-content-info-description-name'>{info.name}</h1>
        <h4 className='song-list-track-content-info-description-author'>{info.author}</h4>
      </div>
      <div className='player-content-controller-timeline'>
        <div className='player-content-controller-timeline-waveform'>
          <Waveform {...audioState} />
        </div>
        <span className='player-content-controller-timeline-time'>{`${toNormalCurrentTime(
          currentTime
        )} / ${duration}`}</span>
      </div>
      <div className='player-content-controller-controls song-controller'>
        <button>
          <Icon color='white' icon='skip-backward' size={{ width: "50px", height: "30px" }} />
        </button>
        <button onClick={() => dispatch(changePlaying({}))}>
          <Icon color='white' icon={playing ? "pause" : "play"} size={{ width: "30px", height: "30px" }} />
        </button>
        <button>
          <Icon color='white' icon='skip-forward' size={{ width: "50px", height: "30px" }} />
        </button>
      </div>
      <input className='player-content-controller-volume' type={"range"} min={0} max={100} value={volume} />
    </div>
  );
};

export default PlayerController;
