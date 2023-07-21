import { useMemo, useState } from "react";
import "./index.css";

const AddExpense = ({ categories }) => {
  const { spend } = categories;
  const [, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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

  const submitHandler = () => {
    const payload = {
      amount: inputValue,
      category: selectedCategory
    }
    console.log('payload', payload);
  }

  const handleCategoryChange = (event) => {
    let value = event.target.value;
    setSelectedCategory(value);
  };

  const spendCategories = spend.map((el) => el.name);

  const isButtonDisabled = useMemo(() => {
    if (!selectedCategory || !inputValue || error)
      return true;
    return false;
  }, [selectedCategory, inputValue, error]);

  console.log('isButtonDisabled', isButtonDisabled);

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
            onChange={handleCategoryChange}
          >
            <option value="">--Please choose a category--</option>
            {spendCategories.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        <div className="addexpense-submit">
          <button onClick={submitHandler} className={`addexpense-button ${isButtonDisabled}`} disabled={isButtonDisabled}>Add Expense</button>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
