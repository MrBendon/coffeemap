import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { plus, minus } from "../store/coffeeSlice";

function Sidebar() {
  const value = useAppSelector((state) => state.coffee.value);

  const dispatch = useAppDispatch();

  function handleOnClickPlus() {
    dispatch(plus());
  }
  function handleOnClickMiuns() {
    dispatch(minus(2));
  }

  return (
    <div className="flex flex-col gap-4">
      Sidebar這里放所有搜出來的咖啡廳資訊卡
      {value}
      <button type="button" onClick={handleOnClickPlus}>
        +
      </button>
      <button type="button" onClick={() => handleOnClickMiuns()}>
        -
      </button>
    </div>
  );
}

export default Sidebar;
