import { cloneElement, useState } from "react";
import Box from "../Box/Box";
import "./_popup.scss";

type PopupProps = {
  controlButton: React.ReactElement;
  buttons: React.ReactNode[];
};

const Popup: React.FC<PopupProps> = ({ controlButton, buttons }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='popup'>
      {cloneElement(controlButton, { onClick: () => setOpen((prev) => !prev) })}
      {open && (
        <Box>
          {buttons.map((button, i) => (
            <div key={i}>{button}</div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Popup;
