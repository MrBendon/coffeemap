import AppLayout from "./layout/AppLayout";
import "./App.css";
import SearchList from "./components/SearchList";
import Map from "./components/Map";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { toggleMobileIsOpenSearchList } from "./store/pagecontrolSlice";

function App() {
  const { mobileIsOpenSearchList, mobileIsOpenSearch } = useAppSelector(
    (state) => state.pagecontrol,
  );
  const dispatch = useAppDispatch();

  function handleOnClick() {
    dispatch(toggleMobileIsOpenSearchList(!mobileIsOpenSearchList));
  }
  return (
    <div>
      <AppLayout>
        <div className=" md:col-span-2">
          <Header />
        </div>
        <div
          className={`fixed  ${
            mobileIsOpenSearchList ? "-left-60" : "left-0"
          } ${
            mobileIsOpenSearch ? "top-[73px]" : "top-[45px]"
          } z-[9999] h-full w-[280px] overflow-hidden rounded-r-md bg-white transition-all md:relative md:left-0 md:top-0 md:w-full md:bg-transparent dark:bg-black md:dark:bg-transparent`}
          onClick={handleOnClick}
          onKeyDown={handleOnClick}
          role="button"
          tabIndex={0}
        >
          <SearchList />{" "}
        </div>
        <div className="h-full w-full">
          <Map />
        </div>
      </AppLayout>
    </div>
  );
}

export default App;
