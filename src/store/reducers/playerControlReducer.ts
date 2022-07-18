import { createSlice } from "@reduxjs/toolkit";
import { CurrentTimeAction, VolumeAction } from "../types/PlayerControlTypes";
import { PlayerControlsState } from "../types/PlayerControlTypes";

const initialState: PlayerControlsState = {
  playing: true,
  currentTime: 0,
  volume: 0,
};

const playerControlSlice = createSlice({
  name: "playerControls",
  initialState,
  reducers: {
    changePlaying(state) {
      if (state.playing) {
        return { ...state, playing: false };
      } else {
        return { ...state, playing: true };
      }
    },
    changeVolume(state, action: VolumeAction) {
      return { ...state, volume: action.payload.volume };
    },
    changeCurrentTime(state, action: CurrentTimeAction) {
      return { ...state, currentTime: action.payload.currentTime };
    },
  },
});

export const { changeCurrentTime, changePlaying, changeVolume } = playerControlSlice.actions;

export default playerControlSlice.reducer;
