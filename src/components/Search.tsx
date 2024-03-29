/* eslint-disable jsx-a11y/control-has-associated-label */
import { FormEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch } from "../hooks/hooks";
import { setSearchKey } from "../store/coffeeSlice";
import { changedDisplayQuantityPages } from "../store/pagecontrolSlice";

function Search() {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log("搜尋關鍵字：", searchValue);
    dispatch(setSearchKey(searchValue));
    dispatch(changedDisplayQuantityPages(1));
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;
    setSearchValue(inputValue);
  }

  return (
    <form
      className="relative flex w-60 gap-4 "
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <input
        className="peer h-6 w-60 rounded-3xl bg-gray-200 px-4 text-xs outline transition-all focus:bg-white focus:outline-blue-700 md:h-8 md:w-80 md:py-4 md:text-base dark:bg-gray-800 dark:text-gray-300 dark:focus:bg-gray-900 dark:focus:text-gray-200 dark:focus:outline-[#0BD9CE]"
        type="text"
        placeholder="可輸入想找的 店名 或 地址"
        onChange={(e) => handleOnChange(e)}
      />
      <button
        className="absolute right-2 top-[50%] -translate-y-[45%] rounded-full bg-gray-200 p-[2px] text-base transition-all hover:-translate-y-[60%] hover:bg-slate-300 active:-translate-y-[40%] md:-translate-y-[50%] md:text-xl dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:peer-focus:text-[#0bD9CE]"
        type="submit"
      >
        <CiSearch />
      </button>
    </form>
  );
}

export default Search;
