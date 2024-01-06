import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { darkModeInit, toggleIsOpenMap } from "../store/pagecontrolSlice";
import ToggleDarkButton from "./UI/ToggleDarkButton";
import Modal from "./Modal";

function Header() {
  const dispatch = useAppDispatch();

  const isOpenMap = useAppSelector((state) => state.pagecontrol.isOpenMap);

  useLayoutEffect(() => {
    dispatch(darkModeInit());
  }, [dispatch]);

  function handleOnClick() {
    dispatch(toggleIsOpenMap());
  }

  return (
    <div className="flex items-center justify-end p-4">
      <button
        type="button"
        className="w-40 rounded-md p-2 text-center transition-all duration-1000"
        onClick={handleOnClick}
      >
        {isOpenMap ? "切換為列表" : "切換為地圖"}
      </button>
      <ToggleDarkButton />
      <Modal>
        <Modal.Button />
        <Modal.Window title="test" content="test content" />
      </Modal>
    </div>
  );
}

export default Header;
