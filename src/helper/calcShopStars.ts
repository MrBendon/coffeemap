import { CoffeeDataType } from "../store/coffeeSlice";

const calcItems: string[] = [
  "wifi",
  "seat",
  "quiet",
  "tasty",
  "cheap",
  "music",
];

function calcShopStars(coffeeShopData: CoffeeDataType) {
  const calcItemsScore: number[] = calcItems.map(
    (item) => Number(coffeeShopData[item]) || 0,
  );
  const totalStars = (
    calcItemsScore.reduce((acc: number, cur: number) => acc + cur, 0) /
    calcItemsScore.length
  ).toFixed(1);

  return totalStars;
}

export default calcShopStars;
