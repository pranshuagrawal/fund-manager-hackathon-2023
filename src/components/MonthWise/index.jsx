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
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default MonthWise;
