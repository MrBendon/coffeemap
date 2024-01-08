import AppLayout from "./layout/AppLayout";

import "./App.css";
import SearchList from "./components/SearchList";
import Map from "./components/Map";
import ListContanier from "./components/ListContanier";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/hooks";

function App() {
  const isOpenMap = useAppSelector((state) => state.pagecontrol.isOpenMap);
  const noShow = "invisible opacity-0 hidden";
  const show = "visible opacity-100";

  return (
    <div>
      <AppLayout>
        <div className="col-span-2">
          <Header />
        </div>
        <SearchList />
        <div
          className={` overflow-hidden transition-all ${
            isOpenMap ? show : noShow
          } `}
        >
          <Map />
        </div>
        <div className={`transition-all ${isOpenMap ? noShow : show}`}>
          <ListContanier />
        </div>
      </AppLayout>
    </div>
  );
}

export default App;
