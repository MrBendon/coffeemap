import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setFilters } from "../../store/coffeeSlice";

interface PropsType {
  name: string;
  labelText: string;
}

function SorterCheckbox({ name, labelText }: PropsType) {
  const dispatch = useAppDispatch();
  const isChecked = useAppSelector((state) =>
    state.coffee.activeFilters.includes(name),
  );
  //   console.log(name, ":", isChecked);
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const filterName = e.currentTarget.name;
    dispatch(setFilters(filterName));
  }
  return (
    <label
      htmlFor={name}
      className="relative flex w-full items-center justify-between  text-xs md:text-base"
    >
      <p className="dark:text-white">{labelText}</p>
      <input
        type="checkbox"
        name={name}
        id={name}
        onChange={handleOnChange}
        className="peer hidden"
        checked={isChecked}
      />
      <div className="dark:peer-checked:bg-primary relative flex h-6 w-16 cursor-pointer items-center justify-start rounded-full bg-gray-300 transition-all peer-checked:justify-end peer-checked:bg-green-500 md:h-8 md:w-20">
        <div
          className={` absolute aspect-square h-[85%] transition-all ${
            isChecked ? "left-[2px] " : "left-[40px] md:left-[50px]"
          }   rounded-full bg-white dark:bg-gray-600`}
        />
        <p className={`px-4 ${isChecked ? "text-white" : "text-black"}`}>
          {isChecked ? "On" : "Off"}
        </p>
      </div>
    </label>
  );
}

export default SorterCheckbox;
