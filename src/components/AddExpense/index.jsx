import { useEffect, useMemo, useState } from 'react';
import { AddIcon } from '../../icons/icons';
import { addTransactions } from '../../db';
import Drawer from '../Drawer';
import './index.css';
import dayjs from 'dayjs';

const AddExpense = ({ categories, transactions, fetchTransactionsFn }) => {
  const [, setIsFocused] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [selectedDate, setSelectedDate] = useState();

  const resetStates = () => {
    setError('');
    setInputValue('');
    setSelectedCategory('');
    setIsLoading('');
    setSelectedDate('');
    setResponseMsg('');
  };
  console.log('selectedCat: ', selectedCategory);

  const handleInputChange = (event) => {
    let value = event.target.value;

    value = value.replace(/[^\d-]/g, '');
    setInputValue(value);

    if (!/^[1-9]\d*$/.test(value)) {
      setError('Please enter a valid positive number.');
    } else {
      setError('');
    }
  };

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const submitHandler = () => {
    const payload = {
      amount: parseInt(inputValue, 10),
      category: selectedCategory,
      date: selectedDate,
    };
    setIsLoading(true);
    addTransactions(payload)
      .then((response) => {
        setIsLoading(false);
        setResponseMsg('Expense Added');
        setTimeout(() => {
          resetStates();
          fetchTransactionsFn();
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setResponseMsg('Something Went Wrong');
      });
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const isButtonDisabled = useMemo(() => {
    if (
      !selectedCategory ||
      selectedCategory === '' ||
      !inputValue ||
      error ||
      !selectedDate
    )
      return true;
    return false;
  }, [selectedCategory, inputValue, error, selectedDate]);

  const dateChangeHandler = (event) => {
    const value = event.target.value;
    setSelectedDate(value);
  };

  const newExpenseHandler = () => {
    setIsAddCategoryOpen((s) => !s);
    resetStates();
  };

  useEffect(() => {
    fetchTransactionsFn();
  }, []);

  const sortedTransactions = useMemo(() => {
    if (!transactions.data) return [];
    const d = [...transactions.data];
    d.sort((a, b) =>
      new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1
    );
    return d;
  }, [transactions.data]);

  return (
    <>
      <button className='link-whitebg' onClick={handleToggleDrawer}>
        Add Expense
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className='addexpense-container'>
          <div className='addexpense-heading'>Add Expense</div>
          <div className='addexpense-header'>
            <button className='link pr0' onClick={newExpenseHandler}>
              <AddIcon className='icon-blue' height='12px' width='12px' /> New
              Expense
            </button>
          </div>
          {isAddCategoryOpen && (
            <div>
              <div className='input-label'>Amount</div>
              <input
                type='text'
                id='amount'
                name='amount'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Add Amount'
                // className="addexpense-input"
              ></input>
              {error && (
                <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>
              )}

              <div className='input-label mt15'>Category Type</div>
              <select
                name='categories'
                id='category-select'
                className="custom-class"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleCategoryChange}
              >
                <option value='' disabled selected>
                  --Please choose a category--
                </option>
                {categories.data.map((item) => {
                  return (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>

              <div className='input-label mt15'>Select Date</div>
              <input
                type='date'
                id='date'
                name='date'
                onChange={dateChangeHandler}
                value={selectedDate}
                max={dayjs().format('YYYY-MM-DD')}
              />
              <div className='addexpense-submit'>
                <button
                  onClick={submitHandler}
                  className={`primary mt15 ${isButtonDisabled}`}
                  disabled={isButtonDisabled}
                >
                  {isLoading ? 'Submitting...' : 'Add Expense'}
                </button>
                {responseMsg && <h5>{responseMsg}</h5>}
              </div>
            </div>
          )}
          <div>
            <h5>Past Expenses</h5>
            <div className='list-container'>
              {sortedTransactions.map((transaction) => (
                <div className='list-container-row'>
                  <div className='list-container-column'>
                    {transaction.amount}
                  </div>
                  <div className='list-container-column'>
                    {transaction.category}
                  </div>
                  <div className='list-container-column'>
                    {transaction.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AddExpense;
