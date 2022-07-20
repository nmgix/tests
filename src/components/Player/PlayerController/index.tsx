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
  let seconds = Math.round(currentTime - minutes * 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
    showPosition: false,
    waveStyle: {
      animate: true,
      color: "white",
      plot: "line",
      pointWidth: 0.2,
    },
    width: 900,
  });
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [currentTime, setCurrentTime] = useState<number>(0);

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

  // при смене песни (переключение автоматическое/не автоматическое)
  useEffect(() => {
    setAudio(new Audio(`resources/music/${mp3name}`));
    if (audio) {
      audio.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (audio) {
      audio.ontimeupdate = function () {
        setCurrentTime(audio.currentTime);
      };
      audio.onended = () => {
        if (songAfter && !audio.loop) {
          dispatch(setCurrentSong({ songId: songAfter.id }));
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  const changePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      let current = audio.duration * Number(e.target.value);
      audio.currentTime = !isNaN(current) ? current : 0;
    }
  };

  return (
    <div className='player-content-controller'>
      <div className='player-content-controller-header song-list-track-content-info-description'>
        <h1 className='song-list-track-content-info-description-name'>{info.name}</h1>
        <h4 className='song-list-track-content-info-description-author'>{info.author}</h4>
      </div>
      <div className='player-content-controller-timeline'>
        <div className='player-content-controller-timeline-waveform'>
          <Waveform {...audioState} />
          <input
            className='player-content-controller-timeline-waveform-range'
            type={"range"}
            value={
              audio
                ? !isNaN((audio.currentTime * 100) / audio.duration / 100)
                  ? (audio.currentTime * 100) / audio.duration / 100
                  : 0
                : 0
            }
            onChange={changePosition}
            min={0}
            max={1}
            step={0.0001}
          />
        </div>
        <span className='player-content-controller-timeline-time'>{`${toNormalCurrentTime(
          currentTime
        )} / ${duration}`}</span>
      </div>
      <div className='player-content-controller-controls song-controller'>
        {songBefore ? (
          <button
            onClick={() =>
              currentTime !== 0
                ? audio
                  ? (audio.currentTime = 0)
                  : null
                : dispatch(setCurrentSong({ songId: songBefore.id }))
            }>
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
