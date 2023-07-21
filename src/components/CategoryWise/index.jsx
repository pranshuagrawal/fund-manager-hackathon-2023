import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const CategoryWise = ({ data: { spend, invest } }) => {
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
        data: spend.map((item) => item.amount),
        name: 'expenditure',
      },
      {
        color: '#5675e8',
        name: 'limit',
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
        data: spend.map((item) => item.limit),
      },
    ],
    exporting: {
      allowHTML: true,
    },
    credits: {
      enabled: false
    }
  };
  const investmentOption = {
    chart: {
      type: 'column',
    },
    spend,
    title: {
      text: null,
    },
    plotOptions: {
      series: {
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
        data: invest.map((item) => item.amount),
        name: 'expenditure',
      },
      {
        color: '#5675e8',
        name: 'limit',
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
        data: invest.map((item) => item.limit),
      },
    ],
    exporting: {
      allowHTML: true,
    },
    credits: {
      enabled: false
    }
  };
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
    </div>
  );
};

export default CategoryWise;
