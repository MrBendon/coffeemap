import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface WindowPropsType {
  title: string;
  content: string;
}

interface ModalContextType {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  closeModal: () => void;
  openModal: () => void;
}

interface ModalPropsType {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModalContext() {
  const useModal = useContext(ModalContext);
  if (!useModalContext) {
    throw new Error("不在使用邊界中");
  }
  return useModal as ModalContextType;
}

function Modal({ children }: ModalPropsType) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => setIsOpenModal(false);
  const openModal = () => setIsOpenModal(true);

  const context: ModalContextType = useMemo(
    () => ({
      isOpenModal,
      setIsOpenModal,
      closeModal,
      openModal,
    }),
    [isOpenModal, setIsOpenModal],
  );

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
}

function Button() {
  const { openModal, isOpenModal } = useModalContext();
  return (
    <button
      className="h-12 w-max rounded-md bg-blue-300"
      type="button"
      onClick={openModal}
    >
      {isOpenModal ? "Close" : "Open"}
    </button>
  );
}

function Window({ title, content }: WindowPropsType) {
  const portalTargetDom = document.body;
  const { isOpenModal } = useModalContext();
  const { closeModal } = useModalContext();
  return isOpenModal
    ? createPortal(
        <section className="fixed left-0 top-0 flex h-screen w-full items-center justify-center  bg-white/80">
          <div className="relative flex flex-col gap-8 rounded-xl border border-gray-500 p-20 blur-none">
            <button
              type="button"
              className=" absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-400"
              onClick={closeModal}
            >
              X
            </button>
            <p className="text-3xl font-bold">{title}</p>
            <p>{content}</p>
          </div>
        </section>,
        portalTargetDom,
        "modal",
      )
    : null;
}

Modal.Button = Button;
Modal.Window = Window;

export default Modal;
