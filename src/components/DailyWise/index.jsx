import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const DailyWise = () => {

  const options = {
    title: {
      text: null
    },
    series: [{
      data: [1, 2, 3]
    }],
    credits: {
      enabled: false
    }
  }

  return (
    <div className="row">
      <div className="column">
        <div className="heading">Daily Expenditure</div>
        <div className="graph-container"><HighchartsReact
          highcharts={Highcharts}
          options={options}
        /></div>
      </div>
      <div className="column">
        <div className="heading">Daily Investment</div>
        <div className="graph-container">Graph</div>
      </div>
    </div>
  )
}

export default DailyWise;


