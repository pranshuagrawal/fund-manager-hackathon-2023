import { inr, round, inra } from "../../methods";
import { UpArrow, DownArrow } from "../../icons/icons";
const Metrics = ({ data, limits }) => {
  const totalExpenditure = data.spend.reduce(
    (acc, el) => ({
      limit: el.limit + acc.limit,
      amount: el.amount + acc.amount,
    }),
    { limit: 0, amount: 0 }
  );

  const totalInvestment = data.invest.reduce(
    (acc, el) => ({
      limit: el.limit + acc.limit,
      amount: el.amount + acc.amount,
    }),
    { limit: 0, amount: 0 }
  );

  const mostOverspentSpentCategory = data.spend.reduce(function (
    prev,
    current
  ) {
    return prev.amount - prev.limit > current.amount - current.limit
      ? prev
      : current;
  });

  const mostLeastInvestedCategory = data.invest.reduce(function (
    prev,
    current
  ) {
    return prev.amount - prev.limit < current.amount - current.limit
      ? prev
      : current;
  });

  return (
    <div className="row">
      <div className="column metrics">
        <div className="metrics-container">
          <div>
            <div className="metrics-heading">Expenditure - This Month</div>
            <div className="metrics-value">{inr(totalExpenditure.amount)}</div>
            <div className="metrics-subtext">
              {totalExpenditure.amount < totalExpenditure.limit ? (
                <span className="color-green">
                  Remaining{" "}
                  {inra(totalExpenditure.limit - totalExpenditure.amount)}
                </span>
              ) : (
                <span className="color-red">
                  Overspending{" "}
                  {inra(totalExpenditure.limit - totalExpenditure.amount)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="metrics-container">
          <div className="metrics-heading">Investment - This Month</div>
          <div className="metrics-value">{inr(totalInvestment.amount)}</div>
          <div className="metrics-subtext">
            {totalInvestment.amount > totalInvestment.limit ? (
              <span className="color-green">
                Invested extra{" "}
                {inra(totalInvestment.limit - totalInvestment.amount)}
              </span>
            ) : (
              <span className="color-red">
                Invest {inra(totalInvestment.limit - totalInvestment.amount)}{" "}
                more
              </span>
            )}
          </div>
        </div>
        <div className="metrics-container">
          <div className="metrics-heading">Most Spent On</div>
          <div className="metrics-value">{mostOverspentSpentCategory.name}</div>
          <div className="metrics-subtext">
            {mostOverspentSpentCategory.amount >
            mostOverspentSpentCategory.limit ? (
              <UpArrow
                className="metric-icon icon-red"
                height="20px"
                width="20px"
              />
            ) : (
              <DownArrow
                className="metric-icon icon-green"
                height="20px"
                width="20px"
              />
            )}
            {round(
              ((mostOverspentSpentCategory.amount -
                mostOverspentSpentCategory.limit) *
                100) /
                mostOverspentSpentCategory.limit
            )}
            %
          </div>
        </div>
        <div className="metrics-container">
          <div className="metrics-heading">Least Invested On</div>
          <div className="metrics-value">{mostLeastInvestedCategory.name}</div>
          <div className="metrics-subtext">
            {mostLeastInvestedCategory.amount <
            mostLeastInvestedCategory.limit ? (
              <UpArrow
                className="metric-icon icon-red"
                height="20px"
                width="20px"
              />
            ) : (
              <DownArrow
                className="metric-icon icon-green"
                height="20px"
                width="20px"
              />
            )}
            {round(
              ((mostLeastInvestedCategory.limit -
                mostLeastInvestedCategory.amount) *
                100) /
                mostLeastInvestedCategory.limit
            )}
            %
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
