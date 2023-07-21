import { useMemo, useState } from "react";
import { AddIcon } from "../../icons/icons";
import { addTransactions } from "../../db";
import Drawer from "../Drawer";
import "./index.css";

const AddExpense = ({ categories }) => {
  const [, setIsFocused] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "--Please choose a category--"
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [selectedDate, setSelectedDate] = useState();

  const resetStates = () => {
    setError("");
    setInputValue("");
    setSelectedCategory("--Please choose a category--");
    setIsLoading("");
    setResponseMsg("");
  }

  const handleInputChange = (event) => {
    let value = event.target.value;

    value = value.replace(/[^\d-]/g, "");
    setInputValue(value);

    if (!/^[1-9]\d*$/.test(value)) {
      setError("Please enter a valid positive number.");
    } else {
      setError("");
    }
  };

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const submitHandler = () => {
    const payload = {
      amount: inputValue,
      category: selectedCategory,
      date: selectedDate
    };
    setIsLoading(true);
    addTransactions(payload)
      .then((response) =>  {
        setIsLoading(false);
        setResponseMsg('Expense Added');

        setTimeout(() => {
          resetStates();
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setResponseMsg('Something Went Wrong');
      });
  }

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const isButtonDisabled = useMemo(() => {
    if (
      !selectedCategory ||
      selectedCategory === "--Please choose a category--" ||
      !inputValue ||
      error
    )
      return true;
    return false;
  }, [selectedCategory, inputValue, error]);

  const dateChangeHandler = (event) => {
    const value = event.target.value;
    setSelectedDate(value);
  }

  const newExpenseHandler = () => {
    setIsAddCategoryOpen((s) => !s);
    resetStates();
  };

  return (
    <>
      <button className="link-whitebg" onClick={handleToggleDrawer}>
        Add Expense
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="addexpense-container">
          <div className="addexpense-heading">Add Expense</div>
          <div className="addexpense-header">
            <button className="link pr0" onClick={newExpenseHandler}>
              <AddIcon className="icon-blue" height="12px" width="12px" /> New
              Expense
            </button>
          </div>
          {isAddCategoryOpen && (
            <div>
              <div className="input-label">Amount</div>
              <input
                type="text"
                id="amount"
                name="amount"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Add Amount"
                // className="addexpense-input"
              ></input>
              {error && (
                <p style={{ color: "red", margin: "5px 0" }}>{error}</p>
              )}

              <div className="input-label mt15">Category Type</div>
              <select
                name="categories"
                id="category-select"
                // className="custom-select"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleCategoryChange}
              >
                <option value="">{selectedCategory}</option>
                {categories.data.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>

              <div className="input-label mt15">Select Date</div>
              <input
                type="date"
                id="date"
                name="date"
                onChange={dateChangeHandler}
                value={selectedDate}
              />
              <div className="addexpense-submit">
                <button
                  onClick={submitHandler}
                  className={`primary mt15 ${isButtonDisabled}`}
                  disabled={isButtonDisabled}
                >
                  {isLoading ? "Submitting..." : "Add Expense"}
                </button>
                {responseMsg && <h5>{responseMsg}</h5>}
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default AddExpense;
