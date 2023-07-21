import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import Drawer from "../Drawer";
import {
  expenseDrawerContent,
  getExpenditureOption,
  getInvestmentOption,
  investDrawerContent,
  gptDrawerContent,
} from "./chartOptions";
import gpt from "../../chatgpt";
import "./index.css";

const CategoryWise = ({ data: { spend, invest } }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    expense: false,
    invest: false,
    gpt: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleToggleExpenseDrawer = () => {
    setIsDrawerOpen((prev) => ({ ...prev, expense: !prev.expense }));
  };
  const handleToggleInvestDrawer = () => {
    setIsDrawerOpen((prev) => ({ ...prev, invest: !prev.invest }));
  };
  const handleToggleGptDrawer = () => {
    setIsDrawerOpen((prev) => ({ ...prev, gpt: !prev.gpt }));
  };

  const expenditureOption = getExpenditureOption(
    spend,
    handleToggleExpenseDrawer,
    setSelectedIndex
  );
  const investmentOption = getInvestmentOption(
    invest,
    handleToggleInvestDrawer,
    setSelectedIndex
  );

  const investmentCategories = invest.map((i) => i.name);
  const [investmentGptMessage, setInvestmentGptMessage] = useState("");

  // useEffect(() => {
  //   gpt
  //     .createChatCompletion({
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         {
  //           role: "user",
  //           content: `Currently I am investing in ${investmentCategories.join(
  //             ", "
  //           )}, where else can I invest in India? Keep it under 10 lines.`,
  //         },
  //       ],
  //     })
  //     .then((chatCompletion) => {
  //       const fetchedMessage = chatCompletion.data.choices[0].message.content;
  //       setInvestmentGptMessage(fetchedMessage);
  //     })
  //     .catch((err) => {
  //       console.log("err:", err);
  //       // setInvestmentGptMessage(chatCompletion.data.choices[0].message);
  //     });
  // }, []);

  useEffect(() => {
    setInvestmentGptMessage(`1. Real estate: Invest in residential or commercial properties for long-term capital appreciation and rental income.
2. Gold and precious metals: Diversify your portfolio by investing in gold and other precious metals through physical holdings, ETFs, or gold mutual funds.
3. Bonds: Consider investing in government or corporate bonds for steady income and capital preservation.
4. Initial Public Offerings (IPOs): Participate in the primary market by subscribing to IPOs of promising companies.
5. Exchange-Traded Funds (ETFs): Invest in a diversified basket of securities representing various sectors, indices, or asset classes.
6. Peer-to-peer lending: Earn interest by lending money to individuals or businesses through online platforms.
7. Public Provident Fund (PPF): Opt for a long-term savings scheme that offers tax benefits and guaranteed returns.
8. Tax-saving fixed deposits: Invest in fixed deposits specifically designed to provide tax benefits under Section 80C of the Income Tax Act.
9. Corporate fixed deposits: Consider higher-yielding fixed deposits offered by reputed companies for potentially greater returns.
10. Systematic Investment Plans (SIPs): Invest in mutual funds regularly and systematically over a period to benefit from rupee-cost averaging.`);
  });

  return (
    <div className="row">
      <div className="column">
        <div className="heading">Category Wise Expenditure</div>
        <div className="graph-container">
          <HighchartsReact
            highcharts={Highcharts}
            options={expenditureOption}
          />
        </div>
      </div>
      <div className="column">
        <div className="heading">
          Category Wise Investment{" "}
          <button className="link p0" onClick={handleToggleGptDrawer}>
            AI Assistant
          </button>
        </div>
        <div className="graph-container1">
          <HighchartsReact highcharts={Highcharts} options={investmentOption} />
        </div>
      </div>
      <Drawer
        isOpen={isDrawerOpen.expense || isDrawerOpen.invest || isDrawerOpen.gpt}
        onClose={() => {
          setIsDrawerOpen({ expense: false, invest: false });
        }}
      >
        {isDrawerOpen.expense && expenseDrawerContent(spend, selectedIndex)}
        {isDrawerOpen.invest && investDrawerContent(invest, selectedIndex)}
        {isDrawerOpen.gpt && gptDrawerContent(investmentGptMessage)}
      </Drawer>
    </div>
  );
};

export default CategoryWise;
