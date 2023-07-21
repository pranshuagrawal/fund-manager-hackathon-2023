import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Historical from './Historical';
const DailyWise = ({data, historicalData, limits}) => {
  const categories = data.spend.map(el => el.date)
  const values = data.spend.map(el => el.amount)
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
        <div className="heading">Daily Investment</div>
        <div className="graph-container"><Historical data={historicalData} limits={limits} /></div>
      </div>
    </div>
  )
}

export default DailyWise;


