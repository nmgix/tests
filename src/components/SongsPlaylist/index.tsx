import "./index.scss";
import SongController from "./SongsController";
import SongsList, { Song } from "./SongsList";

const mockSongs: Song[] = [
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
];

const SongPlaylist = () => {
  return (
    <div className='song-playlist'>
      <SongController />
      <SongsList songs={mockSongs} activeSong={0} />
    </div>
  );
};

export default SongPlaylist;
