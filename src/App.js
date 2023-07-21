import "./App.css";

import CategoryWise from "./components/CategoryWise";
import TimeWise from "./components/TimeWise";
import Metrics from "./components/Metrics";
import ManageCategories from "./components/ManageCategories";

import { categoryWiseData, monthWiseData, limits, dailyData } from "./data";

function App() {
  // https://dribbble.com/shots/11278226-Analytic-dashboard-concept/attachments/2886599?mode=media
  return (
    <div className="container">
      {/* <button onClick={handleToggleDrawer}>Toggle Drawer</button> */}
      <div className="container-cta">
        <button className="link">Add Expense</button>
        <ManageCategories />
      </div>
      <div className="container-inner">
        <Metrics data={categoryWiseData} limits={limits} />
      </div>
      <div className="container-inner">
        <CategoryWise data={categoryWiseData} />
      </div>
      <div className="container-inner">
        <TimeWise
          historicalData={dailyData}
          data={monthWiseData}
          limits={limits}
        />
      </div>
    </div>
  );
}

export default App;
