import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/helpers";
import { changePlaying } from "../../../store/reducers/playerControlReducer";
import { shuffleSongs } from "../../../store/reducers/songControlReducer";
import { changeSortAsc } from "../../../store/reducers/sortControlReducer";
import { Icon } from "../../Icon";
import "./index.scss";

const SongsController = () => {
  const dispatch = useDispatch();
  const playerState = useAppSelector((state) => state.playerControls);
  const sortState = useAppSelector((state) => state.sortControls);

  return (
    <div className='song-controller'>
      <button onClick={() => dispatch(shuffleSongs())}>
        <Icon icon='shuffle' size={{ width: "35px", height: "35px" }} classnames={["shuffle-icon"]} />
      </button>
      <button onClick={() => dispatch(changePlaying({}))}>
        <Icon icon={playerState.playing ? "pause" : "play"} color='white' size={{ width: "35px", height: "35px" }} />
      </button>
      <button onClick={() => dispatch(changeSortAsc({}))}>
        <Icon
          icon='sort'
          color={sortState.sortAsc === null ? "black" : sortState.sortAsc === true ? "green" : "red"}
          size={{ width: "35px", height: "35px" }}
          opacity={sortState.sortAsc !== null ? 1 : 0.3}
        />
      </button>
    </div>
  );
};

export default SongsController;
