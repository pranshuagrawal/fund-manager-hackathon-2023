import './App.css';
import { useState, useEffect } from 'react';
import CategoryWise from './components/CategoryWise';
import TimeWise from './components/TimeWise';
import Metrics from './components/Metrics';
import ManageCategories from './components/ManageCategories';
import AddExpense from './components/AddExpense';

import { monthWiseData, limits, dailyData } from './data';

import {
  addCategory,
  fetchCategories,
  addTransactions,
  fetchTransactions,
} from './db';
import { formatCategoryWiseData, formatDailyData } from './methods';

function App() {
  const [categories, setCategories] = useState({
    data: [],
    error: null,
    loading: false,
  });
  const [transactions, setTransactions] = useState({
    data: [],
    error: null,
    loading: false,
  });

  const [categoryWiseData, setCategoryWiseData] = useState({
    spend: [],
    invest: [],
  });
  const [dailyData, setDailyData] = useState({ spend: [], invest: [] });

  useEffect(() => {
    if (categories.data.length !== 0 && transactions.data.length !== 0) {
      setCategoryWiseData(
        formatCategoryWiseData(categories.data, transactions.data)
      );
      setDailyData(formatDailyData(categories.data, transactions.data));
    }
  }, [categories, transactions]);

  const addCategoryFn = (obj) => {
    addCategory(obj).then(fetchCategoriesFn);
  };

  const fetchCategoriesFn = () => {
    setCategories({
      loading: true,
      data: [],
      error: null,
    });

    fetchCategories()
      .then((categories) => {
        setCategories({
          loading: false,
          data: categories,
          error: null,
        });
      })
      .catch((err) => {
        console.error(err);
        setCategories((d) => ({
          loading: false,
          data: [],
          error: 'Unable to fetch categories',
        }));
      });
  };

  const addTransactionsFn = (obj) => {
    addTransactions(obj).then(fetchTransactionsFn);
  };

  const fetchTransactionsFn = () => {
    setTransactions({
      loading: true,
      data: [],
      error: null,
    });

    fetchTransactions()
      .then((transactions) => {
        setTransactions({
          loading: false,
          data: transactions,
          error: null,
        });
      })
      .catch((err) => {
        console.error(err);
        setTransactions((d) => ({
          loading: false,
          data: [],
          error: 'Unable to fetch transactions',
        }));
      });
  };

  useEffect(() => {
    fetchCategoriesFn();
    fetchTransactionsFn();
  }, []);

  return (
    <div className='container'>
      <div className='container-cta'>
        <div className='logo-container'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Paytm_payments_bank.svg/2560px-Paytm_payments_bank.svg.png'
            alt='paytm logo'
          />
        </div>
        <div>
          <AddExpense
            categories={categories}
            transactions={transactions}
            fetchTransactionsFn={fetchTransactionsFn}
          />
          <ManageCategories
            addCategoryFn={addCategoryFn}
            categories={categories}
          />
        </div>
      </div>
      <div className='container-inner'>
        <Metrics data={categoryWiseData} monthWiseData={monthWiseData} />
      </div>
      <div className='container-inner'>
        <CategoryWise data={categoryWiseData} />
      </div>
      <div className='container-inner'>
        <TimeWise
          historicalData={dailyData}
          data={monthWiseData}
          limits={limits}
        />
      </div>
    </div>
  );
}

export default App;
