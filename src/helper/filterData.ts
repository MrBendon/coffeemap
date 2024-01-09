import { CoffeeDataType } from "../store/coffeeSlice";

interface PropsType {
  data: CoffeeDataType[];
  filters: string[];
}

function filterData({ data, filters }: PropsType) {}
