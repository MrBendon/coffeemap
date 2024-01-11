import { useLayoutEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { darkModeInit } from "../store/pagecontrolSlice";
import ToggleDarkButton from "./UI/ToggleDarkButton";
import Modal from "./Modal";
import Search from "./Search";
import CoffeePNG from "../assets/coffee.png";

function ModalDescription() {
  return (
    <div className="flex w-full flex-col  justify-evenly gap-2 text-wrap break-words font-light">
      <p>此咖啡探索地圖網站為個人練習專案，主要練習項目為:</p>
      <ol className="list-decimal pl-6">
        <li>React</li>
        <li>TypeScript</li>
        <li>RTK Query</li>
        <li>React leaflet</li>
        <li>airbnb typescript-airbnb 等eslint設置</li>
      </ol>
      <p>
        此外，本專案由於有CORS問題，先使用vite proxy代理，故僅能在demo時之用。
      </p>
    </div>
  );
}

function Header() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(darkModeInit());
  }, [dispatch]);

  return (
    <div className="flex h-full items-center justify-end px-4">
      <h2 className=" mr-auto flex items-center gap-2 text-2xl font-bold dark:text-white">
        <img
          className="aspect-square w-8 -translate-y-1"
          src={CoffeePNG}
          alt="coffee icon"
        />
        咖啡探索地圖
      </h2>
      <div className="mx-auto">
        <Search />
      </div>

      <ToggleDarkButton />
      <Modal>
        <Modal.Button />
        <Modal.Window title="說明框" subTitle="專案說明">
          <ModalDescription />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Header;
