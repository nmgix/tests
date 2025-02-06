import { PayloadAction } from "@reduxjs/toolkit";

export type PlayerControlsState = {
  volume: number;
  playing: boolean;
  waveformReadyToLoad: boolean;
};

export type WaveformAction = PayloadAction<{ ready: boolean }>;
export type PlayAction = PayloadAction<{ play?: boolean }>;
export type VolumeAction = PayloadAction<{ volume: number }>;
