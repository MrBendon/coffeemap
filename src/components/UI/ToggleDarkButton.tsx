/* eslint-disable import/no-extraneous-dependencies */
import { LuMoonStar } from "react-icons/lu";
import { CiLight } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleIsDarkMode } from "../../store/pagecontrolSlice";

function ToggleDarkButton() {
  const isDarkMode = useAppSelector((state) => state.pagecontrol.isDarkMode);
  const dispatch = useAppDispatch();

  function handleOnClick() {
    dispatch(toggleIsDarkMode());
  }

  return (
    <label
      htmlFor="checkobx-input"
      className="relative flex h-8 w-24 cursor-pointer items-center justify-center rounded-full  border-2 border-gray-600 bg-white p-[2px] dark:border-gray-400 dark:bg-black"
    >
      <input
        type="checkbox"
        id="checkobx-input"
        className="peer hidden"
        defaultChecked={isDarkMode}
        onClick={() => handleOnClick()}
      />
      <p className=" visible text-sm opacity-100  dark:invisible dark:opacity-0">
        Light
      </p>
      <div className="absolute left-[30%] top-[50%] flex aspect-square h-8 -translate-y-[50%] translate-x-[80%] items-center justify-center rounded-full bg-yellow-200 transition-all dark:-translate-x-[70%]  dark:bg-blue-600 dark:text-white">
        {isDarkMode ? <LuMoonStar /> : <CiLight />}
      </div>
      <p className="invisible text-sm opacity-0 dark:visible dark:text-white dark:opacity-100">
        Dark
      </p>
    </label>
  );
}

export default ToggleDarkButton;
