import classnames from "classnames";
import { Modal } from "../modal";
import "./confirm-dialog.scss";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onReject,
  onConfirm,
  externalClassnames
}: {
  isOpen: boolean;
  onClose: () => void;
  onReject: () => void;
  onConfirm: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  externalClassnames?: string | string[];
}) => {
  return (
    <Modal ariaLabel='confirm dialog' onClose={onClose} show={isOpen} externalClassnames={classnames("confirm-dialog", externalClassnames)}>
      {" "}
      <div className=''>
        <p className=''>Вы точно хотите это сделать?</p>
        <div className=''>
          <button
            className=''
            onClick={() => {
              if (onReject) onReject();
              onClose();
            }}>
            Отмена
          </button>
          <button
            className=''
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}>
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
ConfirmDialog.displayName = "Confirm Dialog";
