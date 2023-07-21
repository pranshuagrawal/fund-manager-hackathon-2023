import dayjs from 'dayjs';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Historical from './Historical';
const DailyWise = ({data, historicalData, limits}) => {
  const dailyData = [...historicalData.spend].filter(d => dayjs(new Date(d.date)).format("YYYY-MM") ===  dayjs(new Date()).format("YYYY-MM"));
   dailyData.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1
  );
  const categories = dailyData.map(el => dayjs(el.date).format('DD MMM YY'))
  const values = dailyData.map(el => el.amount)
  const options = {
    chart: {
        type: 'spline'
    },
    title: {
      text: null
    },
    yAxis: {
      title: {
        text: "Amount"
      }
    },
    xAxis: {
        categories,
        accessibility: {
            description: 'Months of the year'
        }
    },
    legends: {
      enabled: false
    },
    series: [{
      name: "Daily Spent",
      data: values,
      color: "#5675e8"
    }],
    credits: {
      enabled: false
    }
  }

  return (
    <div className="row">
      <div className="column">
        <div className="heading">Daily Expenditure</div>
        <div className="graph-container">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
      </div>
      <div className="column">
        <div className="heading">Historical Expenditure and Investment</div>
        <div className="graph-container"><Historical data={data} limits={limits} /></div>
      </div>
    </div>
  )
}

export default DailyWise;


