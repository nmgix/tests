import { createSlice } from "@reduxjs/toolkit";
import { ChangeCurrentSongAction, ChangeSongPositionAction, SongState } from "../types/SongControlTypes";

const initialState: SongState = {
  currentSongId: 0,
  songs: [
    {
      id: 0,
      cover: "jnatun-dioma.jpg",
      duration: "2.36",
      info: {
        author: "Jnatun",
        name: "Dioma",
      },
    },
    {
      id: 1,
      cover: "more-plastic-old-school.jpg",
      duration: "2.56",
      info: {
        author: "Simbai & Fizzy The Streets",
        name: "Set Me Free",
      },
    },
    {
      id: 2,
      cover: "more-plastic-old-streets1.jpg",
      duration: "1.50",
      info: {
        author: "More Plastic",
        name: "Old Streets",
      },
    },
  ],
};

const songControlSlice = createSlice({
  name: "songControls",
  initialState,
  reducers: {
    changeCurrentSong(state, action: ChangeCurrentSongAction) {
      console.log(action.payload);
      if (action.payload.songId !== undefined) {
        return { ...state, currentSongId: action.payload.songId };
      } else {
        return state;
      }
    },
    shuffleSongs(state) {
      function shuffle<T>(array: T[]) {
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = array.length,
          randomIndex;

        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
      }

      // @ https://stackoverflow.com/questions/60806105/error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-r
      void (state.songs = shuffle(state.songs));
    },
    changeSongPosition(state, action: ChangeSongPositionAction) {
      const { songId, exchangeWithAbove } = action.payload;

      function array_move<T>(arr: (T | undefined)[], old_index: number, new_index: number): T[] {
        // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
        if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr as T[];
      }

      return {
        ...state,
        songs: array_move(
          state.songs,
          state.songs.indexOf(state.songs.find((el) => el.id === songId)!),
          exchangeWithAbove ? -1 : 1
        ),
      };
    },
  },
});

export const { changeCurrentSong, changeSongPosition, shuffleSongs } = songControlSlice.actions;

export default songControlSlice.reducer;
