import { MouseEvent, useLayoutEffect } from "react";
import { VscListSelection } from "react-icons/vsc";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  darkModeInit,
  toggleMobileIsOpenSearch,
  toggleMobileIsOpenSearchList,
} from "../store/pagecontrolSlice";
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
        此外，本專案由於有CORS問題，先使用vite
        proxy代理進行開發，故僅能在demo時之用。
      </p>
    </div>
  );
}

function Header() {
  const dispatch = useAppDispatch();
  const { mobileIsOpenSearchList, mobileIsOpenSearch: MobileIsOpenSearch } =
    useAppSelector((state) => state.pagecontrol);
  useLayoutEffect(() => {
    dispatch(darkModeInit());
  }, [dispatch]);

  function toggleOpenSearchBar() {
    dispatch(toggleMobileIsOpenSearch(!MobileIsOpenSearch));
  }

  function toggleMobileIsOpenList(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    console.log("click");
    dispatch(toggleMobileIsOpenSearchList(!mobileIsOpenSearchList));
  }

  return (
    <>
      <div className="flex h-max w-full flex-wrap items-center justify-end px-4 md:h-full">
        <h2 className=" mr-auto flex items-center gap-2 text-xl font-bold md:text-2xl dark:text-white">
          <img
            className="aspect-square w-6 -translate-y-1 md:w-8"
            src={CoffeePNG}
            alt="coffee icon"
          />
          咖啡探索地圖
        </h2>
        <div className="mx-auto hidden md:block">
          <Search />
        </div>
        <div className="dark:text-primary flex h-full items-center p-2 text-2xl md:hidden">
          <button type="button" onClick={toggleOpenSearchBar}>
            <MdOutlineScreenSearchDesktop />{" "}
          </button>
        </div>

        <ToggleDarkButton />
        <Modal>
          <Modal.Button />
          <Modal.Window title="說明框" subTitle="專案說明">
            <ModalDescription />
          </Modal.Window>
        </Modal>
      </div>
      <div
        className={`flex ${
          MobileIsOpenSearch || "hidden"
        } mx-auto h-max w-full items-center justify-center px-5 pb-2 md:hidden`}
      >
        <Search />
        <button
          type="button"
          className="dark:text-primary z-[9999]  ml-auto flex items-center justify-center text-xl"
          onClick={toggleMobileIsOpenList}
        >
          <VscListSelection />{" "}
        </button>
      </div>
    </>
  );
}

export default Header;
