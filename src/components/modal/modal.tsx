import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

interface IModal {
  children: React.ReactNode | React.ReactNode[];
  show: boolean;
  onClose: () => void;
  ariaLabel: string;
  externalClassnames?: string | string[];
  hideCloseBtn?: true;
  outsideToClose?: true;
}

export const Modal: React.FC<IModal> = ({ children, show, onClose, externalClassnames, ariaLabel, hideCloseBtn, outsideToClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [show]);

  return createPortal(
    <dialog tabIndex={-1} aria-label={ariaLabel} ref={modalRef} onCancel={onClose} onClose={onClose} className={`modal ${externalClassnames ?? ""}`}>
      {!hideCloseBtn && (
        <button onClick={() => modalRef.current?.close()} className='modal__close'>
          X
        </button>
      )}
      {children}
    </dialog>,
    document.body
  );
};
Modal.displayName = "Modal";
