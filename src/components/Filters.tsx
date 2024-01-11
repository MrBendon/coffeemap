import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { resetFilters } from "../store/coffeeSlice";
import SorterCheckbox from "./UI/SorterCheckbox";
import { toggleIsOpenFiltersBlock } from "../store/pagecontrolSlice";

function Filters() {
  const dispatch = useAppDispatch();
  const isOpenFiltersBlock = useAppSelector(
    (state) => state.pagecontrol.isOpenFiltersBlock,
  );
  function handleOnClickResetFilters() {
    dispatch(resetFilters());
  }
  function handleOnClick() {
    dispatch(toggleIsOpenFiltersBlock());
  }
  return (
    <div className="group mb-8">
      <div className=" relative grid grid-cols-2 items-center justify-center gap-2 rounded-lg bg-gray-200 p-4 peer-hover:bg-gray-400 dark:bg-gray-800">
        <SorterCheckbox name="socket" labelText="有插座" />
        <SorterCheckbox name="wifi" labelText="有wifi" />
        <SorterCheckbox name="limited_time" labelText="無限時" />
        <SorterCheckbox name="standing_desk" labelText="有站位" />

        <button
          type="button"
          className=" col-span-2 h-8 cursor-pointer rounded-full border border-gray-500 transition-all hover:bg-slate-400 hover:text-white dark:text-white dark:hover:bg-gray-800"
          onClick={handleOnClickResetFilters}
        >
          清除篩選器
        </button>
        <button
          type="button"
          className=" absolute left-4 top-full w-max cursor-pointer rounded-b-xl bg-gray-200 p-2  transition-all hover:text-blue-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-blue-300"
          onClick={handleOnClick}
        >
          {isOpenFiltersBlock ? "闔上篩選器" : "開啟篩選器"}
        </button>
      </div>
    </div>
  );
}

export default Filters;
