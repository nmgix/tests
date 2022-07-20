import { PayloadAction } from "@reduxjs/toolkit";

export type PlayerControlsState = {
  currentTime: number;
  volume: number;
  playing: boolean;
  waveformReadyToLoad: boolean;
};

export type WaveformAction = PayloadAction<{ ready: boolean }>;
export type PlayAction = PayloadAction<{ play?: boolean }>;
export type VolumeAction = PayloadAction<{ volume: number }>;
export type CurrentTimeAction = PayloadAction<{ currentTime: number }>;
