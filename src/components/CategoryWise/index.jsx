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
        color: 'rgba(158, 159, 163, 0.5)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: spend.map((item) => item.amount),
        name: 'expenditure',
      },
      {
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
  };
  const investmentOption = {
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
        color: 'rgba(158, 159, 163, 0.5)',
        pointPlacement: -0.2,
        linkedTo: 'main',
        data: invest.map((item) => item.amount),
        name: 'expenditure',
      },
      {
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
