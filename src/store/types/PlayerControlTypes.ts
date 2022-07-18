import { PayloadAction } from "@reduxjs/toolkit";

export type PlayerControlsState = {
  currentTime: number;
  volume: number;
  playing: boolean;
};

export type VolumeAction = PayloadAction<{ volume: number }>;
export type CurrentTimeAction = PayloadAction<{ currentTime: number }>;
