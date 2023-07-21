export const inr = (num) =>
  num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });

export const inra = (num) =>
  Math.abs(num).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });

export const round = (value) => Math.round(value * 100) / 100;
export const rounda = (value) => Math.round(Math.abs(value) * 100) / 100;

export function formatCategoryWiseData(categories, transactions) {
  const categoryWiseData = {
    spend: [],
    invest: [],
  };

  const mergedTransactions = transactions?.reduce((merged, transaction) => {
    const existingTransaction = merged.find(
      (item) => item.category === transaction.category
    );

    if (existingTransaction) {
      existingTransaction.amount += transaction.amount;
    } else {
      merged.push({ ...transaction });
    }

    return merged;
  }, []);

  mergedTransactions.forEach((transaction) => {
    const category = categories.find(
      (category) => category.name === transaction.category
    );

    if (category) {
      const data = {
        name: category.name,
        amount: transaction.amount,
        limit: category.limit,
      };

      if (category.type === 'expenditure') {
        categoryWiseData.spend.push(data);
      } else if (category.type === 'investment') {
        categoryWiseData.invest.push(data);
      }
    }
  });

  return categoryWiseData;
}

export function formatDailyData(categories, transactions) {
  const dailyData = {
    spend: [],
    invest: [],
  };

  const mergedTransactions = transactions?.reduce((merged, transaction) => {
    const existingTransaction = merged.find(
      (item) =>
        item.category === transaction.category && item.date === transaction.date
    );

    if (existingTransaction) {
      existingTransaction.amount += transaction.amount;
    } else {
      merged.push({ ...transaction });
    }

    return merged;
  }, []);

  const groupTransactionsByDate = mergedTransactions?.reduce(
    (result, transaction) => {
      const date = new Date(transaction.date);
      const formattedDate = `${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

      if (!result[formattedDate]) {
        result[formattedDate] = {
          spend: 0,
          invest: 0,
        };
      }

      const category = categories.find(
        (cat) => cat.name === transaction.category
      );

      if (category) {
        if (category.type === 'expenditure') {
          result[formattedDate].spend += transaction.amount;
        } else if (category.type === 'investment') {
          result[formattedDate].invest += transaction.amount;
        }
      }

      return result;
    },
    {}
  );

  for (const date in groupTransactionsByDate) {
    const { spend, invest } = groupTransactionsByDate[date];
    dailyData.spend.push({ date, amount: spend });
    dailyData.invest.push({ date, amount: invest });
  }

  return dailyData;
}
