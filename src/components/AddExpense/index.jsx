import { useState } from "react";
import "./index.css";

const AddExpense = ({ categories }) => {
  const { spend } = categories;
  const [, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

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

  const spendCategories = spend.map((el) => el.name);

  return (
    <>
      <div className="addexpense-container">
        <div className="addexpense-heading">Add Expense</div>
        <div className="addexpense-amount">
          <input
            type="text"
            id="amount"
            name="amount"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add Amount"
            className="addexpense-input"
          ></input>
        {error && <p style={{ color: "red", margin: "5px 0" }}>{error}</p>}
        </div>
        <div className="addexpense-category">
          <select
            name="categories"
            id="category-select"
            className="custom-select"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <option value="">--Please choose a category--</option>
            {spendCategories.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
