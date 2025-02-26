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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
  onReject?: () => void;
  externalClassnames?: string | string[];
}) => {
  return (
    <Modal ariaLabel='confirm dialog' onClose={onClose} show={isOpen} externalClassnames={classnames("confirm-dialog", externalClassnames)}>
      <>
        <p className='confirm-dialog-prompt-text'>Вы точно хотите это сделать?</p>
        <div className='confirm-dialog-btn-wrapper'>
          <button
            className='default-button'
            onClick={() => {
              if (onReject) onReject();
              onClose();
            }}>
            Отмена
          </button>
          <button
            className='default-button'
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}>
            Подтвердить
          </button>
        </div>
      </>
    </Modal>
  );
};
ConfirmDialog.displayName = "Confirm Dialog";
