import { CoffeeDataType } from "../store/coffeeSlice";

// interface PropsType {
//   dataset: CoffeeDataType[];
//   customizedFilters: string[];
// }

type DatasetType = CoffeeDataType[];
type CustomizedFilters = string[];

interface CheckConditionsType {
  [key: string]: (value: number | string) => boolean;
}

const checkConditions: CheckConditionsType = {
  wifi: (value) => (typeof value === "number" ? value > 0 : false),
  socket: (value) => value !== "no",
  limited_time: (value) => value === "no",
  standing_desk: (value) => value === "yes",
};

function filterData(
  dataset: DatasetType,
  customizedFilters: CustomizedFilters,
): CoffeeDataType[] {
  const AfterFilterData = dataset.filter((coffeeShop) => {
    const result = customizedFilters.every((filterName) => {
      //   console.log(filterName);
      //   const [keyword, condition] = filter.split(":");
      //   console.log(keyword, condition);
      const dataValue = coffeeShop[filterName as keyof CoffeeDataType];
      if (dataValue === undefined) return false;
      return checkConditions[filterName](dataValue);
    });
    return result && coffeeShop;
  });
  return AfterFilterData;
}

export default filterData;
