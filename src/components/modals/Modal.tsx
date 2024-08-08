import { useCallback, useEffect, useState, FormEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { ModalProps } from "@/types/userAuthentication";
import Button from "../Button";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen); // State to manage modal open/close

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setIsModalOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      if (disabled) {
        return;
      }

      onSubmit(e);
    },
    [onSubmit, disabled]
  );

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          modal
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          no-scrollbar
          fixed 
          inset-0 
          z-[999]
          outline-none 
          focus:outline-none
          bg-neutral-800/90
          overflow-hidden
        "
      >
        <div
          className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-4
          mx-auto 
          h-auto
          lg:h-auto
          md:h-auto
          max-h-full
          "
        >
          {/*content*/}
          <div
            className={`
            flex
            items-center
            translate
            duration-300
            h-full
            ${isModalOpen ? "translate-y-0" : "translate-y-full"}
            ${isModalOpen ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
              overflow-y-auto
              no-scrollbar
            "
            >
              {/*header*/}
              <div
                className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <div className="text-xl font-semibold">{title}</div>
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                    className="w-full"
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
