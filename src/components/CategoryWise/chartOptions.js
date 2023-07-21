export const getExpenditureOption = (spend, handleToggleDrawer) => {
  const expenditureOption = {
    chart: {
      type: "column",
    },
    // Custom option for templates
    spend,
    title: {
      text: null,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: handleToggleDrawer,
        },
        grouping: false,
        borderWidth: 0,
      },
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      type: "category",
      title: {
        text: "Expenditure Categories",
      },
      categories: spend.map((item) => item.name),
    },
    yAxis: [
      {
        title: {
          text: "Amount",
        },
      },
    ],
    series: [
      {
        color: "rgba(88, 105, 241, 0.3)",
        pointPlacement: -0.2,
        linkedTo: "main",
        data: spend.map((item) => item.limit),
        name: "limit",
      },
      {
        color: "#5675e8",
        name: "expenditure",
        id: "main",
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: "16px",
            },
          },
        ],
        data: spend.map((item) => item.amount),
      },
    ],
    exporting: {
      allowHTML: true,
    },
    credits: {
      enabled: false,
    },
  };

  const expenditureChildren = (
    <>
      <h2 className="drawer-heading">Drawer Expense Content</h2>
      <p className="drawer-content">This is the content of the drawer.</p>
    </>
  );

  return { expenditureOption, expenditureChildren };
};

export const getInvestmentOption = (invest, handleToggleDrawer) => {
  const investmentOption = {
    chart: {
      type: "column",
    },
    invest,
    legend: {
      enabled: false,
    },
    title: {
      text: null,
    },

    tooltip: {
      shared: true,
    },
    xAxis: {
      type: "category",
      title: {
        text: "Investment Categories",
      },
      categories: invest.map((item) => item.name),
    },
    yAxis: [
      {
        title: {
          text: "Amount",
        },
      },
    ],
    series: [
      {
        color: "rgba(88, 105, 241, 0.3)",
        pointPlacement: -0.2,
        linkedTo: "main",
        data: invest.map((item) => item.limit),
        name: "limit",
      },
      {
        color: "#5675e8",
        name: "investment",
        id: "main",
        dataLabels: [
          {
            enabled: true,
            inside: true,
            style: {
              fontSize: "16px",
            },
          },
        ],
        data: invest.map((item) => item.amount),
      },
    ],
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: handleToggleDrawer,
        },
        grouping: false,
        borderWidth: 0,
      },
    },
    exporting: {
      allowHTML: true,
    },
    credits: {
      enabled: false,
    },
  };

  const investmenteChildren = (
    <>
      <h2 className="drawer-heading">Drawer Investment Content</h2>
      <p className="drawer-content">This is the content of the drawer.</p>
    </>
  );

  return { investmentOption, investmenteChildren };
};
