import { useMemo, useState } from "react";
import { addTransactions } from "../../db";
import Drawer from "../Drawer";
import "./index.css";

const AddExpense = ({ categories }) => {
  const { spend } = categories;
  const [, setIsFocused] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("--Please choose a category--");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

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
      category: selectedCategory
    }
    setIsLoading(true);
    addTransactions(payload)
      .then((response) =>  {
        setIsLoading(false);
        setResponseMsg('Expense Added')
      })
      .catch((error) => {
        setIsLoading(false);
        setResponseMsg('Something Went Wrong', error);
      });
  }

  const handleCategoryChange = (event) => {
    let value = event.target.value;
    setSelectedCategory(value);
  };

  const spendCategories = spend.map((el) => el.name);

  const isButtonDisabled = useMemo(() => {
    if (!selectedCategory || selectedCategory === "--Please choose a category--" || !inputValue || error)
      return true;
    return false;
  }, [selectedCategory, inputValue, error]);

  const newExpenseHandler = () => {
    setIsAddCategoryOpen((s) => !s);
    setError("");
    setInputValue("");
    setSelectedCategory("--Please choose a category--");
    setIsLoading("");
    setResponseMsg("");
  }

  return (
    <>
      <button className="link" onClick={handleToggleDrawer}>
        Add Expense
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="addexpense-container">
          <div className="addexpense-heading">Add Expense</div>
          <div className="addexpense-plus" onClick={newExpenseHandler}>
            + New Expense
          </div>
          {isAddCategoryOpen && (<div>
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
                {spendCategories.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            
            <div className="addexpense-submit">
              <button
                onClick={submitHandler}
                className={`primary mt15 ${isButtonDisabled}`}
                disabled={isButtonDisabled}
              >
                {isLoading ? "Submitting..." : "Add Expense"}
              </button>
              {responseMsg && <h2>{responseMsg}</h2>}
            </div>
          </div>)}
        </div>
      </Drawer>
    </>
  );
};

export default AddExpense;
