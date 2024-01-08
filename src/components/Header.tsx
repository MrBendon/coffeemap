import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { darkModeInit, toggleIsOpenMap } from "../store/pagecontrolSlice";
import ToggleDarkButton from "./UI/ToggleDarkButton";
import Modal from "./Modal";
import Search from "./Search";

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
    <div className="flex h-full items-center justify-end px-4">
      <h2 className="mr-auto text-2xl font-bold dark:text-white">
        咖啡探索地圖
      </h2>
      <div className="mx-auto">
        <Search />
      </div>
      <button
        type="button"
        className="w-40 rounded-md p-2 text-center transition-all  dark:text-white"
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
