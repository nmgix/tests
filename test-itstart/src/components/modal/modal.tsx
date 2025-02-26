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
}

export const Modal: React.FC<IModal> = ({ children, show, onClose, externalClassnames, ariaLabel, hideCloseBtn }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [show]);

  return createPortal(
    <dialog
      onClick={onClose}
      tabIndex={-1}
      aria-label={ariaLabel}
      ref={modalRef}
      onCancel={onClose}
      onClose={onClose}
      className={`modal ${externalClassnames ?? ""}`}>
      <div className='modal-wrapper' onClick={e => e.stopPropagation()}>
        {!hideCloseBtn && (
          <button onClick={() => modalRef.current?.close()} className='modal__close'>
            X
          </button>
        )}
        {children}
      </div>
    </dialog>,
    document.body
  );
};
Modal.displayName = "Modal";
