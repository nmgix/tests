import classnames from "classnames";
import { useRef } from "react";
import { useClickOutside } from "src/shared/lib/hooks/useClickOutside";
import { IconMemo } from "src/shared/ui";
import { useHotkeys } from "react-hotkeys-hook";
import { createPortal } from "react-dom";
import "./modal.scss";

interface IModal {
  children: React.ReactNode;
  show: boolean;
  closeModal: () => void;
  externalClassnames?: string | string[];
}

export const Modal: React.FC<IModal> = ({ children, show, closeModal, externalClassnames }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, closeModal);
  useHotkeys("esc", closeModal);

  if (!show) return null;
  return createPortal(
    <div ref={modalRef} className={classnames("modal", externalClassnames)}>
      <button onClick={closeModal} className='modal__close'>
        <IconMemo icon='close' />
      </button>
      {children}
    </div>,
    document.body
  );
};
