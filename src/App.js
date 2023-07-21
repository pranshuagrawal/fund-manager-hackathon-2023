import "./App.css";

import CategoryWise from "./components/CategoryWise";
import MonthWise from "./components/MonthWise";
import DailyWise from "./components/DailyWise";

import { categoryWiseData, monthWiseData, limits } from "./data";

function App() {
  return (
    <div className="container">
      <div className="container-inner">
        <CategoryWise data={categoryWiseData} limits={limits} />
      </div>
      <div className="container-inner">
        <MonthWise data={monthWiseData} limits={limits} />
      </div>
      <div className="container-inner">
        <DailyWise data={monthWiseData} limits={limits} />
      </div>
    </div>
  );
}

export default App;
