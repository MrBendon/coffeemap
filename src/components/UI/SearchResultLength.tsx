import { CoffeeDataType } from "../../store/coffeeSlice";

interface PropsType {
  searchResults: CoffeeDataType[];
}

function SearchResultLength({ searchResults }: PropsType) {
  return (
    <div className="w-full rounded-lg bg-gray-200 px-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-white">
      共有{" "}
      <em className="dark:text-primary text-lg font-bold text-black underline underline-offset-4">
        {searchResults.length}
      </em>{" "}
      筆店家資料
    </div>
  );
}

export default SearchResultLength;
