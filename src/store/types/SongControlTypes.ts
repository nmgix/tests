import { PayloadAction } from "@reduxjs/toolkit";

export type Song = {
  id: number;
  info: {
    name: string;
    author: string;
  };
  duration: number | string;
  cover: string;
};

export type SongState = {
  currentSongId: number;
  songs: Song[];
};

export type ChangeCurrentSongAction = PayloadAction<{ songId: number }>;
export type ChangeSongPositionAction = PayloadAction<{ songId: number; exchangeWithAbove: boolean }>;
