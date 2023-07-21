import { useState } from 'react';
import './App.css';

import CategoryWise from './components/CategoryWise';
import Drawer from './components/Drawer';
import TimeWise from './components/TimeWise';

import { categoryWiseData, monthWiseData, limits, dailyData } from './data';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  // https://dribbble.com/shots/11278226-Analytic-dashboard-concept/attachments/2886599?mode=media
  return (
    <div className='container'>
      <button onClick={handleToggleDrawer}>Toggle Drawer</button>
      <div className='container-inner'>
        <CategoryWise data={categoryWiseData} />
      </div>
      <div className='container-inner'>
        <TimeWise
          historicalData={dailyData}
          data={monthWiseData}
          limits={limits}
        />
      </div>
      <div>
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <h2>Drawer Content</h2>
          <p>This is the content of the drawer.</p>
        </Drawer>
      </div>
    </div>
  );
}

export default App;
