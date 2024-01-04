import { useState } from "react";

function ToggleButton() {
  const [isDark, setIsDark] = useState(false);

  function handleOnClick() {
    setIsDark((prev) => !prev);
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <label
      htmlFor="checkobx-input"
      className="relative flex h-8 w-16 items-center justify-center rounded-full border-4 border-black bg-blue-600 p-[2px] "
    >
      <input
        type="checkbox"
        id="checkobx-input"
        className="peer hidden"
        defaultChecked={isDark}
        onClick={handleOnClick}
      />
      <div
        className={`${
          isDark ? "left-0" : "right-0"
        } absolute top-[50%] flex aspect-square h-full -translate-y-[50%] items-center justify-center rounded-full bg-red-400 transition-all peer-checked:translate-x-full peer-checked:bg-green-400`}
      >
        {isDark ? "月亮" : "太陽"}
      </div>
    </label>
  );
}

export default ToggleButton;
