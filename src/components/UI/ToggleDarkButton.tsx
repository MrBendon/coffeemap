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
      className="relative flex h-6 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-gray-600  bg-white md:h-8 md:w-24 md:p-[2px] dark:border-gray-400 dark:bg-black"
    >
      <input
        type="checkbox"
        id="checkobx-input"
        className="peer hidden"
        defaultChecked={isDarkMode}
        onClick={() => handleOnClick()}
      />
      <p className=" visible translate-x-2 text-xs opacity-100  md:translate-x-0 md:text-sm dark:invisible dark:opacity-0">
        Light
      </p>
      <div className="absolute left-[30%] top-[50%] flex aspect-square h-7 -translate-y-[50%] translate-x-[80%] items-center justify-center rounded-full bg-yellow-200 transition-all md:h-8 dark:-translate-x-[90%] dark:bg-blue-600   dark:text-white md:dark:-translate-x-[70%]">
        {isDarkMode ? <LuMoonStar /> : <CiLight />}
      </div>
      <p className="invisible -translate-x-2 text-xs opacity-0 md:-translate-x-0 md:text-sm dark:visible dark:text-white dark:opacity-100">
        Dark
      </p>
    </label>
  );
}

export default ToggleDarkButton;
