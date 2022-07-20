import { createSlice } from "@reduxjs/toolkit";
import { ChangeCurrentSongAction, ChangeSongPositionAction, SongState } from "../types/SongControlTypes";
import { ChangeSortAction } from "../types/SortControlTypes";

const initialState: SongState = {
  currentSongId: 0,
  songs: [
    {
      id: 0,
      cover: "dioma.jpg",
      duration: "2.36",
      info: {
        author: "Jnatun",
        name: "Dioma",
      },
      mp3name: "dioma.mp3",
    },
    {
      id: 1,
      cover: "set-me-free.jpg",
      duration: "2.56",
      info: {
        author: "Simbai & Fizzy The Streets",
        name: "Set Me Free",
      },
      mp3name: "set-me-free.mp3",
    },
    {
      id: 2,
      cover: "royalty.jpg",
      duration: "3.43",
      info: {
        author: "Maestro Chives, Egzod, Neoni",
        name: "Royalty",
      },
      mp3name: "royalty.mp3",
    },
    {
      id: 3,
      cover: "nobody.jpg",
      duration: "3.10",
      info: {
        author: "Zack Merci, CRVN",
        name: "Nobody",
      },
      mp3name: "nobody.mp3",
    },
    {
      id: 4,
      cover: "feel.jpg",
      duration: "2.36",
      info: {
        author: "DigEx, Raptures.",
        name: "Feel",
      },
      mp3name: "feel.mp3",
    },
    {
      id: 5,
      cover: "alone.jpg",
      duration: "3.34",
      info: {
        author: "Cajama",
        name: "Alone",
      },
      mp3name: "alone.mp3",
    },
    {
      id: 6,
      cover: "pressure.png",
      duration: "3.14",
      info: {
        author: "Perk Pietrek, Abstrakt",
        name: "Pressure",
      },
      mp3name: "pressure.mp3",
    },
    {
      id: 7,
      cover: "feelings.jpg",
      duration: "2.41",
      info: {
        author: "Cajama, Tisoki",
        name: "Feelings",
      },
      mp3name: "feelings.mp3",
    },
    {
      id: 8,
      cover: "house.jpg",
      duration: "3.52",
      info: {
        author: "3rd Prototype, Emdi",
        name: "House",
      },
      mp3name: "house.mp3",
    },
  ],
};

const songControlSlice = createSlice({
  name: "songControls",
  initialState,
  reducers: {
    setCurrentSong(state, action: ChangeCurrentSongAction) {},
    changeCurrentSong(state, action: ChangeCurrentSongAction) {
      // console.log(state.songs.map((song) => song.id));
      if (action.payload.songId !== undefined) {
        // console.log(action.payload.songId);
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
          for (let i = 0; i < resultArray.length; i++) {
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
          let k = new_index - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

        return arr as T[];
      }

      let songIndex = state.songs.indexOf(state.songs.find((el) => el.id === songId)!);

      let newArr = array_move(state.songs, songIndex, exchangeWithAbove ? songIndex - 1 : songIndex + 1);

      void (state.songs = newArr);
    },
    sortSongs(state, action: ChangeSortAction) {
      const { sortAsc } = action.payload;

      let reA = /[^a-zA-Z]/g;
      let reN = /[^0-9]/g;

      function sortAlphaNum(a: string, b: string, asc: boolean) {
        let aA = a.replace(reA, "");
        let bA = b.replace(reA, "");
        if (aA === bA) {
          let aN = parseInt(a.replace(reN, ""), 10);
          let bN = parseInt(b.replace(reN, ""), 10);
          return aN === bN ? 0 : asc ? (aN > bN ? 1 : -1) : aN < bN ? 1 : -1;
        } else {
          return asc ? (aA > bA ? 1 : -1) : aA < bA ? 1 : -1;
        }
      }

      switch (sortAsc) {
        case true:
        case false: {
          let resultArray = state.songs.sort((song1, song2) =>
            sortAlphaNum(song1.info.name, song2.info.name, action.payload.sortAsc!)
          );
          state.songs = resultArray;
          return state;
        }

        default:
        case null: {
          return state;
        }
      }
    },
  },
});

export const { setCurrentSong, changeCurrentSong, changeSongPosition, shuffleSongs, sortSongs } =
  songControlSlice.actions;

export default songControlSlice.reducer;
