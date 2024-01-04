import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { toggleIsOpenMap } from "../store/pagecontrolSlice";
import ToggleButton from "./UI/ToggleButton";

function Header() {
  const dispatch = useAppDispatch();
  const isOpenMap = useAppSelector((state) => state.pagecontrol.isOpenMap);

  function handleOnClick() {
    dispatch(toggleIsOpenMap());
  }

  // const isDarkMode = document.documentElement.classList.contains("dark");
  // console.log(isDarkMode);

  function toggleIsDarkMode() {
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <div>
      <button
        type="button"
        className="w-40 rounded-md p-2 text-center transition-all duration-1000"
        onClick={handleOnClick}
      >
        {isOpenMap ? "切換為列表" : "切換為地圖"}
      </button>
      <button type="button" className="rounded-lg bg-blue-300 px-4 py-2 " onClick={toggleIsDarkMode}>
        改變顏色
      </button>
      <ToggleButton />
      header 深色模式 收藏列表
    </div>
  );
}

export default Header;
