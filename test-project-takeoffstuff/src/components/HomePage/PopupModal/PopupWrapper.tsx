import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import "./_popup.scss";

export type PopupInstanceProps = {
  id: string;
  jsx: JSX.Element | React.FC<{ [x: string]: string | number }>;
  modalHandler?: () => void;
};

export const PopupWrapper: React.FC<{ popups: PopupInstanceProps[] }> = ({ popups }) => {
  const [popupStack, setPopups] = useState<PopupInstanceProps[]>([]);

  useEffect(() => {
    setPopups(popups);
  }, [popups]);

  return (
    <div className='popupWrapper'>
      {popupStack.length > 0 ? (
        popupStack.map((popup) => {
          return (
            <Modal
              show={true}
              backdrop={true}
              keyboard={true}
              className='popup'
              onHide={popup.modalHandler ? popup.modalHandler : undefined}
              key={popup.id}>
              {/* <Modal.Header className='position-relative'>
                <Modal.Title>

                </Modal.Title>

              </Modal.Header> */}
              <Modal.Body>{popup.jsx}</Modal.Body>
            </Modal>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
