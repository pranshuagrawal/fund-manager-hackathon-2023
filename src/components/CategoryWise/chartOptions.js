import { inr } from '../../methods';

export const getExpenditureOption = (
  spend,
  handleToggleDrawer,
  setSelectedIndex
) => {
  const expenditureOption = {
    chart: {
      type: 'column',
    },
    // Custom option for templates
    spend,
    title: {
      text: null,
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: function (event) {
            handleToggleDrawer();
            setSelectedIndex(event.point.index);
          },
        },
        grouping: false,
        borderWidth: 0,
      },
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Expenditure Categories',
      },
      categories: spend.map((item) => item.name),
    },
    yAxis: [
      {
        title: {
          text: 'Amount',
        },
      },
    ],
    series: [
      {
        color: 'rgba(88, 105, 241, 0.3)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: spend.map((item) => item.limit),
        name: 'limit',
      },
      {
        color: '#5675e8',
        name: 'expenditure',
        id: 'main',
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: '16px',
            },
          },
        ],
        data: spend.map((item) => item.amount),
      },
    ],
    exporting: {
      allowHTML: true,
    },
    credits: {
      enabled: false,
    },
  };

  return expenditureOption;
};

export const getInvestmentOption = (
  invest,
  handleToggleDrawer,
  setSelectedIndex
) => {
  const investmentOption = {
    chart: {
      type: 'column',
    },
    invest,
    legend: {
      enabled: true,
    },
    title: {
      text: null,
    },

    tooltip: {
      shared: true,
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Investment Categories',
      },
      categories: invest.map((item) => item.name),
    },
    yAxis: [
      {
        title: {
          text: 'Amount',
        },
      },
    ],
    series: [
      {
        color: 'rgba(88, 105, 241, 0.3)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: invest.map((item) => item.limit),
        name: 'limit',
      },
      {
        color: '#5675e8',
        name: 'investment',
        id: 'main',
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: '16px',
            },
          },
        ],
        data: invest.map((item) => item.amount),
      },
    ],
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: function (event) {
            handleToggleDrawer();
            setSelectedIndex(event.point.index);
          },
        },
        grouping: false,
        borderWidth: 0,
      },
    },
    exporting: {
      allowHTML: true,
    },
    credits: {
      enabled: false,
    },
  };

  return investmentOption;
};

export const expenseDrawerContent = (spendList, index) => {
  const expense = spendList?.[index];
  return (
    <>
      <h2 className='expense-heading'>{expense?.name} Expense Summary</h2>
      <div className='expense-summary'>
        <div className='expense-summary-values'>
          <div>
            You have spent {inr(expense?.amount)}. Your limit for{' '}
            {expense?.name} category is {inr(expense?.limit)}.
          </div>
        </div>
        <div className='expense-content'>
          {expense?.limit > expense?.amount && (
            <div className=''>
              <div className='expense-result color-green'>
                You still have {inr(expense?.limit - expense?.amount)} left.{' '}
              </div>
              <div className='expense-advice'>
                Spend Wisely! Or better invest!
              </div>
            </div>
          )}
          {expense?.limit < expense?.amount && (
            <div>
              <div className='expense-result color-red'>
                You have already overspent{' '}
                {inr(expense?.amount - expense?.limit)}.
              </div>
              <div className='expense-advice'>
                Make sure to balance this amount by spending less in other
                categories.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export const investDrawerContent = (investList, index) => {
  const invest = investList?.[index];
  return (
    <>
      <h2 className='expense-heading'>{invest?.name} Investment Summary</h2>
      <div className='expense-summary'>
        <div className='expense-summary-values'>
          <div>
            You have invested {inr(invest?.amount)}. Your limit for{' '}
            {invest?.name} is {inr(invest?.limit)}.
          </div>
        </div>
        <div className='expense-content'>
          {invest?.limit > invest?.amount && (
            <div className=''>
              <div className='expense-result color-red'>
                You still have {inr(invest?.limit - invest?.amount)} left to
                invest.
              </div>
              <div className='expense-advice'>
                Mange your expense Wisely! and invest!
              </div>
            </div>
          )}
          {invest?.limit < invest?.amount && (
            <div>
              <div className='expense-result color-green'>
                Nice, you have already invested{' '}
                {inr(invest?.amount - invest?.limit)} more in ${invest?.name}.
              </div>
              <div className='expense-advice'>
                Make sure to keep investing in other investment categories.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
