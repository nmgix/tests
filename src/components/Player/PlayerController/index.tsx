import { useEffect, useState } from "react";
import { Icon } from "../../Icon";
import Waveform from "waveform-react";
import "./index.scss";
import { /*useAppDispatch,*/ useAppSelector } from "../../../store/helpers";
import { useDispatch } from "react-redux";
import { changePlaying, changeVolume } from "../../../store/reducers/playerControlReducer";
import { Song } from "../../../store/types/SongControlTypes";
import { setCurrentSong } from "../../../store/reducers/songControlReducer";

type AudioType = {
  context: AudioContext | null;
  buffer: AudioBuffer | null;
  height: number;
  markerStyle: {
    color: string;
    width: number;
  };
  position: number;
  responsive: boolean;
  showPosition: boolean;
  waveStyle: {
    animate: boolean;
    color: string;
    plot: "bar" | "line";
    pointWidth: number;
  };
  width: number;
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

const PlayerController: React.FC<Song & { songBefore: Song | undefined; songAfter: Song | undefined }> = ({
  duration,
  id,
  info,
  mp3name,
  songBefore,
  songAfter,
}) => {
  const dispatch = useDispatch();
  const { playing, volume, waveformReadyToLoad } = useAppSelector((store) => store.playerControls);

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
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (waveformReadyToLoad === true) {
      setAudioState({ ...audioState, context: getContext() });
    } else {
      setAudioState({ ...audioState, context: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveformReadyToLoad]);

  const getFile = async (path: string) => {
    if (audioState.context) {
      const buffer = await getAudioBuffer(path, audioState.context);
      setAudioState({ ...audioState, buffer: buffer });
    }
  };

  useEffect(() => {
    if (audioState.context) {
      getFile(`resources/music/${mp3name}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioState.context]);

  useEffect(() => {
    if (audio) {
      if (playing === true) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [playing, audio]);
  useEffect(() => {
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume, audio]);

  useEffect(() => {
    setAudio(new Audio(`resources/music/${mp3name}`));
    if (audio) {
      audio.load();
      audio.onended = () => {
        if (songAfter) {
          dispatch(setCurrentSong({ songId: songAfter.id }));
        }
      };
    }
  }, [id]);
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
          audio ? audio.currentTime : 0
        )} / ${duration}`}</span>
      </div>
      <div className='player-content-controller-controls song-controller'>
        {songBefore ? (
          <button onClick={() => dispatch(setCurrentSong({ songId: songBefore.id }))}>
            <Icon color='white' icon='skip-backward' size={{ width: "50px", height: "30px" }} />
          </button>
        ) : (
          <></>
        )}
        <button onClick={() => dispatch(changePlaying({}))}>
          <Icon color='white' icon={playing ? "pause" : "play"} size={{ width: "30px", height: "30px" }} />
        </button>
        {songAfter ? (
          <button onClick={() => dispatch(setCurrentSong({ songId: songAfter.id }))}>
            <Icon color='white' icon='skip-forward' size={{ width: "50px", height: "30px" }} />
          </button>
        ) : (
          <></>
        )}
      </div>
      <input
        className='player-content-controller-volume'
        type={"range"}
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={(e) => dispatch(changeVolume({ volume: Number(e.target.value) }))}
      />
    </div>
  );
};

export default PlayerController;
