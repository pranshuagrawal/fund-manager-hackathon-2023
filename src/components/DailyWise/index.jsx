const DailyWise = () => {

    const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}

return (
        <div className="row">
            <div className="column">
                <div className="heading">Daily Expenditure</div>
                <div className="graph-container">Graph</div>
            </div>
            <div className="column">
                <div className="heading">Daily Investment</div>
                <div className="graph-container">Graph</div>
            </div>
        </div>
    )
}

export default DailyWise;


