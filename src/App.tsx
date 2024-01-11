import AppLayout from "./layout/AppLayout";
import "./App.css";
import SearchList from "./components/SearchList";
import Map from "./components/Map";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <AppLayout>
        <div className="col-span-2">
          <Header />
        </div>
        <SearchList />
        <Map />
      </AppLayout>
    </div>
  );
}

export default App;
