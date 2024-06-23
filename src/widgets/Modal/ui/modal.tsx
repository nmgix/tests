import classnames from "classnames";
import { IconMemo } from "src/shared/ui";

interface IModal {
  children: React.ReactNode;
  closeModal: () => void;
  externalClassnames?: string | string[];
}

export const Modal: React.FC<IModal> = ({ children, closeModal, externalClassnames }) => {
  return (
    <div className={classnames("modal", externalClassnames)}>
      <button onClick={closeModal} className='modal__close'>
        <IconMemo icon='close' />
      </button>
      {children}
    </div>
  );
};
