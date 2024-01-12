import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineInfo } from "react-icons/md";

interface WindowPropsType {
  title: string;
  subTitle: string;
  children?: ReactNode;
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
  const { openModal } = useModalContext();
  return (
    <button
      className="dark:text-primary mx-4 w-max rounded-md p-2 text-3xl"
      type="button"
      onClick={openModal}
    >
      <MdOutlineInfo />
      {}
    </button>
  );
}

function Window({ title, subTitle, children }: WindowPropsType) {
  const portalTargetDom = document.body;
  const { isOpenModal } = useModalContext();
  const { closeModal } = useModalContext();
  return isOpenModal
    ? createPortal(
        <section className="fixed left-0 top-0 z-[9999] flex h-screen w-full items-center justify-center bg-white/80 dark:bg-black/80">
          <div className="relative flex w-max max-w-80 flex-col rounded-xl  border border-gray-500 bg-gray-100 px-10 py-10 blur-none md:max-w-[40rem] dark:bg-gray-800 dark:text-white">
            <button
              type="button"
              className=" absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-400"
              onClick={closeModal}
            >
              X
            </button>
            <div className=" absolute left-0 top-[15%] w-full border-b border-gray-400" />
            <p className="z-10 mx-auto w-max bg-gray-100 px-8 pb-4 text-3xl font-bold dark:bg-gray-800">
              {title}
            </p>
            <p className="flex flex-wrap pb-6 text-xl font-medium italic text-gray-500 dark:text-gray-300">
              {subTitle}
            </p>
            {children}
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

Window.defaultProps = {
  children: <p>Default Children</p>,
};
