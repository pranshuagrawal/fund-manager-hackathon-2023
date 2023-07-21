import "./App.css";

import CategoryWise from "./components/CategoryWise";
import MonthWise from "./components/MonthWise";
import DailyWise from "./components/DailyWise";

import { categoryWiseData, monthWiseData, limits, dailyData } from "./data";

function App() {
  // https://dribbble.com/shots/11278226-Analytic-dashboard-concept/attachments/2886599?mode=media
  return (
    <div className="container">
      <div className="container-inner">
        <CategoryWise data={categoryWiseData} limits={limits} />
      </div>
      <div className="container-inner">
        <MonthWise data={monthWiseData} limits={limits} />
      </div>
      <div className="container-inner">
        <DailyWise data={dailyData} limits={limits} />
      </div>
    </div>
  );
}

export default App;
