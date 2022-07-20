import { createSlice } from "@reduxjs/toolkit";
import { PlayAction, VolumeAction, WaveformAction } from "../types/PlayerControlTypes";
import { PlayerControlsState } from "../types/PlayerControlTypes";

const initialState: PlayerControlsState = {
  playing: false,
  volume: 50,
  waveformReadyToLoad: true,
};

const playerControlSlice = createSlice({
  name: "playerControls",
  initialState,
  reducers: {
    setWaveformLoadState(state, action: WaveformAction) {
      state.waveformReadyToLoad = action.payload.ready;
    },
    changePlaying(state, action: PlayAction) {
      if (action.payload.play) {
        return { ...state, playing: action.payload.play };
      } else {
        if (state.playing) {
          return { ...state, playing: false };
        } else {
          return { ...state, playing: true };
        }
      }
    },
    changeVolume(state, action: VolumeAction) {
      return { ...state, volume: action.payload.volume };
    },
  },
});

export const { setWaveformLoadState, changePlaying, changeVolume } = playerControlSlice.actions;

export default playerControlSlice.reducer;
