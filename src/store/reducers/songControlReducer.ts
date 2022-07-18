import { createSlice } from "@reduxjs/toolkit";
import { ChangeCurrentSongAction, ChangeSongPositionAction, SongState } from "../types/SongControlTypes";
import { ChangeSortAction } from "../types/SortControlTypes";

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
      cover: "simbai-fizzy-the-streets-set-me-free.jpg",
      duration: "2.56",
      info: {
        author: "Simbai & Fizzy The Streets",
        name: "Set Me Free",
      },
    },
    {
      id: 2,
      cover: "more-plastic-old-school.jpg",
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

      const shuffleRecoursive = <T extends { id: number }>(array: T[], triesLimit: number, tries: number = 0): T[] => {
        if (tries >= triesLimit) {
          return array;
        } else {
          const resultArray = shuffle(array);

          // не работает нормально, проблема с прокси
          for (var i = 0; i < resultArray.length; i++) {
            if (resultArray[i].id === array[i].id) {
              tries++;
              return shuffleRecoursive(resultArray, triesLimit, tries);
            } else {
              continue;
            }
          }

          return resultArray;
        }
      };

      // @ https://stackoverflow.com/questions/60806105/error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-r
      void (state.songs = shuffleRecoursive(state.songs, 5));
    },
    changeSongPosition(state, action: ChangeSongPositionAction) {
      const { songId, exchangeWithAbove } = action.payload;

      function array_move<T>(arr: (T | undefined)[], old_index: number, new_index: number): T[] {
        // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
        console.log(old_index, new_index);
        if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

        return arr as T[];
      }

      var songIndex = state.songs.indexOf(state.songs.find((el) => el.id === songId)!);

      var newArr = array_move(state.songs, songIndex, exchangeWithAbove ? songIndex - 1 : songIndex + 1);

      void (state.songs = newArr);
    },
    sortSongs(state, action: ChangeSortAction) {
      const { sortAsc } = action.payload;

      var reA = /[^a-zA-Z]/g;
      var reN = /[^0-9]/g;

      function sortAlphaNum(a: string, b: string, asc: boolean) {
        var aA = a.replace(reA, "");
        var bA = b.replace(reA, "");
        if (aA === bA) {
          var aN = parseInt(a.replace(reN, ""), 10);
          var bN = parseInt(b.replace(reN, ""), 10);
          return aN === bN ? 0 : asc ? (aN > bN ? 1 : -1) : aN < bN ? 1 : -1;
        } else {
          return asc ? (aA > bA ? 1 : -1) : aA < bA ? 1 : -1;
        }
      }
      console.log("sorting");

      switch (sortAsc) {
        case true:
        case false: {
          void (state.songs = state.songs.sort((song1, song2) =>
            sortAlphaNum(song1.info.name, song2.info.name, action.payload.sortAsc!)
          ));
          return;
        }

        default:
        case null: {
          return state;
        }
      }
    },
  },
});

export const { changeCurrentSong, changeSongPosition, shuffleSongs, sortSongs } = songControlSlice.actions;

export default songControlSlice.reducer;
