import { useAppDispatch } from "../hooks/hooks";
import { resetFilters } from "../store/coffeeSlice";
import SorterCheckbox from "./UI/SorterCheckbox";

function Filters() {
  const dispatch = useAppDispatch();

  function handleOnClickResetFilters() {
    dispatch(resetFilters());
  }

  return (
    <div className=" grid grid-cols-2 items-center justify-center gap-2 rounded-lg bg-gray-200 p-4">
      <SorterCheckbox name="socket" labelText="有插座" />
      <SorterCheckbox name="wifi" labelText="有wifi" />
      <SorterCheckbox name="limited_time" labelText="無限時" />
      <SorterCheckbox name="standing_desk" labelText="有站位" />

      <button
        type="button"
        className=" col-span-2 h-8 cursor-pointer rounded-full border border-gray-500 transition-all hover:bg-slate-400 hover:text-white"
        onClick={handleOnClickResetFilters}
      >
        清除篩選器
      </button>
    </div>
  );
}

export default Filters;
