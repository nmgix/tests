import { useState } from "react";
import { Icon } from "../../Icon";
import "./index.scss";

const SongsController = () => {
  type Options = {
    shuffle: boolean;
    play: boolean; //будет браться из общего скоупа
    sortAsc: boolean;
  };
  const [options /*, setOptions*/] = useState<Options>({
    play: true,
    shuffle: false,
    sortAsc: false,
  });

  return (
    <div className='song-controller'>
      <button>
        <Icon
          icon='shuffle'
          color={options.shuffle ? "white" : "black"}
          size={{ width: "35px", height: "35px" }}
          opacity={options.shuffle ? 1 : 0.3}
        />
      </button>
      <button>
        <Icon icon={options.play ? "pause" : "play"} color='white' size={{ width: "35px", height: "35px" }} />
      </button>
      <button>
        <Icon
          icon='sort'
          color={options.shuffle ? "white" : "black"}
          size={{ width: "35px", height: "35px" }}
          opacity={options.sortAsc ? 1 : 0.3}
        />
      </button>
    </div>
  );
};

export default SongsController;
