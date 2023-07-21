import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';
import Drawer from '../Drawer';
import {
  expenseDrawerContent,
  getExpenditureOption,
  getInvestmentOption,
  investDrawerContent,
} from './chartOptions';
import './index.css';

const CategoryWise = ({ data: { spend, invest } }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    expense: false,
    invest: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleToggleExpenseDrawer = () => {
    setIsDrawerOpen((prev) => ({ ...prev, expense: !prev.expense }));
  };
  const handleToggleInvestDrawer = () => {
    setIsDrawerOpen((prev) => ({ ...prev, invest: !prev.invest }));
  };

  const expenditureOption = getExpenditureOption(
    spend,
    handleToggleExpenseDrawer,
    setSelectedIndex
  );
  const investmentOption = getInvestmentOption(
    invest,
    handleToggleInvestDrawer,
    setSelectedIndex
  );

  return (
    <div className='row'>
      <div className='column'>
        <div className='heading'>Category Wise Expenditure</div>
        <div className='graph-container'>
          <HighchartsReact
            highcharts={Highcharts}
            options={expenditureOption}
          />
        </div>
      </div>
      <div className='column'>
        <div className='heading'>Category Wise Investment</div>
        <div className='graph-container1'>
          <HighchartsReact highcharts={Highcharts} options={investmentOption} />
        </div>
      </div>
      <Drawer
        isOpen={isDrawerOpen.expense || isDrawerOpen.invest}
        onClose={() => {
          setIsDrawerOpen({ expense: false, invest: false });
        }}
      >
        {isDrawerOpen.expense && expenseDrawerContent(spend, selectedIndex)}
        {isDrawerOpen.invest && investDrawerContent(invest, selectedIndex)}
      </Drawer>
    </div>
  );
};

export default CategoryWise;
