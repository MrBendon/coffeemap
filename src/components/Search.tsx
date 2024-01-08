/* eslint-disable jsx-a11y/control-has-associated-label */
import { FormEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";

function Search() {
  const { data: coffeeData } = useGetAllCoffeeQuery();
  console.log(coffeeData);
  const [searchValue, setSearchValue] = useState("");
  function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(searchValue);
    const targetCoffeeShop = coffeeData?.find(
      (coffee) =>
        coffee.name?.includes(searchValue) ||
        coffee.address?.includes(searchValue),
    );
    console.log(targetCoffeeShop);
  }
  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;
    setSearchValue(inputValue);
  }
  //   function handleOnKeyDown(e:KeyboardEvent){

  // }

  return (
    <form className="relative flex gap-4" onSubmit={(e) => handleOnSubmit(e)}>
      <input
        className="h-8 w-80 rounded-2xl px-4 outline-none dark:border dark:border-gray-300 dark:bg-gray-800 dark:text-gray-300"
        type="text"
        placeholder="可輸入想找的 店名 或 地址"
        onBlur={(e) => handleOnBlur(e)}
        // onKeyDown={(e)=>handleOnKeyDown(e)}
      />
      <button
        className="absolute right-2 top-[50%] -translate-y-[50%] text-xl"
        type="submit"
      >
        <CiSearch />
      </button>
    </form>
  );
}

export default Search;
