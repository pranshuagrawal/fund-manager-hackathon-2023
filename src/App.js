import logo from "./logo.svg";
import "./App.css";

import CategoryWise from "./components/CategoryWise";
import MonthWise from "./components/MonthWise";

function App() {
  return (
    <div className="container">
      <div className="container-inner">
        <CategoryWise />
      </div>
      <div className="container-inner">
        <MonthWise />
      </div>
    </div>
  );
}

export default App;
