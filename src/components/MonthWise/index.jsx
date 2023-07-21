import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MonthWise = ({ data, limits }) => {
  const { invest, spend } = data;

  const xAxisData = invest.map(item => {
    return item?.month;
  })

  const yAxisDataInvest = invest.map(item => {
    return item?.amount
  })

  const yAxisDataSpend = spend.map(item => {
    return item?.amount
  })

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: null,
    },
    series: [
      {
        name: 'Invest',
        marker: {
            symbol: 'square'
        },
        data: yAxisDataInvest,
      },
      {
        name: 'Expenses',
        marker: {
            symbol: 'square'
        },
        data: yAxisDataSpend,
      },
    ],
    xAxis: {
      categories: xAxisData,
      accessibility: {
        description: "Expenditure",
      },
    },
    yAxis: {
      title: {
        text: "Expenses",
      },
      labels: {
        format: "₹{value}",
      },
    },
    credits: {
      enabled: false,
    },
  };
  return (
    <>
      <div className="row">
        <div className="column">
          <div className="heading">Month Wise Expenditure and Investment</div>
          <div className="graph-container">Graph</div>
        </div>
      </div>
      <h1>Month Wise</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default MonthWise;
