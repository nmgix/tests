import classnames from "classnames";
import { useEffect, useRef } from "react";
import { IconMemo } from "src/shared/ui";
import { createPortal } from "react-dom";
import "./modal.scss";

interface IModal {
  children: React.ReactNode;
  show: boolean;
  closeModal: () => void;
  label: string;
  externalClassnames?: string | string[];
}

export const Modal: React.FC<IModal> = ({ children, show, closeModal, externalClassnames, label }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) modalRef.current?.showModal();
  }, [show]);

  useEffect(() => {
    modalRef.current?.addEventListener("click", closeOnBackDropClick);

    function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
      const dialogElement = currentTarget as HTMLDialogElement;
      const isClickedOnBackDrop = target === dialogElement;
      if (isClickedOnBackDrop) {
        dialogElement?.close();
      }

      return () => {
        modalRef.current?.removeEventListener("click", closeOnBackDropClick);
      };
    }
  }, []);

  return createPortal(
    <dialog
      tabIndex={-1}
      aria-label={label}
      ref={modalRef}
      onCancel={closeModal}
      onClose={closeModal}
      className={classnames("modal", externalClassnames)}>
      <button onClick={() => modalRef.current?.close()} className='modal__close'>
        <IconMemo icon='close' />
      </button>
      {children}
    </dialog>,
    document.body
  );
};
