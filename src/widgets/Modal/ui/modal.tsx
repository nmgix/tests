import classnames from "classnames";
import { useRef } from "react";
import { useClickOutside } from "src/shared/lib/hooks/useClickOutside";
import { IconMemo } from "src/shared/ui";
import { useHotkeys } from "react-hotkeys-hook";
import "./modal.scss";

interface IModal {
  children: React.ReactNode;
  closeModal: () => void;
  externalClassnames?: string | string[];
}

export const Modal: React.FC<IModal> = ({ children, closeModal, externalClassnames }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, closeModal);
  useHotkeys("esc", closeModal);

  return (
    <div ref={modalRef} className={classnames("modal", externalClassnames)}>
      <button onClick={closeModal} className='modal__close'>
        <IconMemo icon='close' />
      </button>
      {children}
    </div>
  );
};
