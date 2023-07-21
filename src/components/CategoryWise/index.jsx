import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';
import Drawer from '../Drawer';
import { getExpenditureOption, getInvestmentOption } from './chartOptions';

const CategoryWise = ({ data: { spend, invest } }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    expense: false,
    invest: false,
  });

  const handleToggleExpenseDrawer = () => {
    setIsDrawerOpen((prev) => ({ ...prev, expense: !prev.expense }));
  };
  const handleToggleInvestDrawer = () => {
    setIsDrawerOpen((prev) => ({ ...prev, invest: !prev.invest }));
  };

  const { expenditureOption, expenditureChildren } = getExpenditureOption(
    spend,
    handleToggleExpenseDrawer
  );
  const { investmentOption, investmenteChildren } = getInvestmentOption(
    invest,
    handleToggleInvestDrawer
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
        {isDrawerOpen.expense && expenditureChildren}
        {isDrawerOpen.invest && investmenteChildren}
      </Drawer>
    </div>
  );
};

export default CategoryWise;
