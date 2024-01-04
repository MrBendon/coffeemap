import axios from "axios";
import { useEffect } from "react";
import AppLayout from "./layout/AppLayout";

import "./App.css";
import Sidebar from "./components/Sidebar";
import MapContainer from "./components/MapContainer";
import ListContanier from "./components/ListContanier";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/hooks";

function App() {
  const isOpenMap = useAppSelector((state) => state.pagecontrol.isOpenMap);
  const noShow = "invisible opacity-0 hidden";
  const show = "visible opacity-100";
  // useEffect(() => {
  //   async function fetchData() {
  //     const Response = await axios.get("/api/cafes");
  //     console.log(Response);
  //     const { data: coffeeData } = Response;
  //     console.log(coffeeData);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      <AppLayout>
        <div className="col-span-2">
          <Header />
        </div>
        <Sidebar />
        <div className={` transition-all ${isOpenMap ? show : noShow}`}>
          <MapContainer />
        </div>
        <div className={`transition-all ${isOpenMap ? noShow : show}`}>
          <ListContanier />
        </div>
      </AppLayout>
    </div>
  );
}

export default App;
