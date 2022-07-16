import { useState } from "react";
import Image from "../Image";
import { Song } from "../SongsPlaylist/SongsList";
import "./index.scss";
import PlayerController from "./PlayerController";

export type PlayingState = {
  currentTime: number;
  volume: number;
  playing: boolean;
};

const Player: React.FC<Song> = (song) => {
  const [playingState /*, setPlayingState*/] = useState<PlayingState>({
    currentTime: 97,
    volume: 50,
    playing: true,
  });

  return (
    <div className='player'>
      <div className='player-content'>
        <Image imgSrc={`resources/covers/${song.cover}`} className='player-content-cover' />
        <PlayerController {...song} {...playingState} />
      </div>
    </div>
  );
};

export default Player;
