import classnames from "classnames";
import { useCallback, useEffect, useRef } from "react";
import { useClickOutside } from "src/shared/lib/hooks/useClickOutside";
import { IconMemo } from "src/shared/ui";
import { useHotkeys } from "react-hotkeys-hook";
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
  const internalCloseModal = useCallback(() => {
    closeModal();
    modalRef.current?.close();
  }, [closeModal]);
  useClickOutside(modalRef, internalCloseModal);
  // useHotkeys("esc", internalCloseModal);

  useEffect(() => {
    if (show) modalRef.current?.showModal();
  }, [show]);

  useEffect(() => {
    modalRef.current?.addEventListener("click", closeOnBackDropClick);

    function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
      const dialogElement = currentTarget as HTMLDialogElement;
      const isClickedOnBackDrop = target === dialogElement;
      console.log("click");
      if (isClickedOnBackDrop) {
        console.log("click+++");
        dialogElement?.close();
      }

      return () => {
        modalRef.current?.removeEventListener("click", closeOnBackDropClick);
      };
    }
  }, []);

  if (!show) return null;
  return createPortal(
    <dialog tabIndex={-1} aria-label={label} ref={modalRef} className={classnames("modal", externalClassnames)}>
      <button onClick={closeModal} className='modal__close'>
        <IconMemo icon='close' />
      </button>
      {children}
    </dialog>,
    document.body
  );
};
