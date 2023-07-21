import { useState } from "react";
import { AddIcon } from "../../icons/icons";
import Drawer from "../Drawer";
import "./style.css";

const ManageCategories = ({ addCategoryFn, categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  const DEF_CAT_STATE = {
    name: "",
    type: "expenditure",
    limit: 10000,
  };
  const [addCategoryForm, setAddCategoryForm] = useState({ ...DEF_CAT_STATE });

  const inputHandler = (val, key) => {
    setAddCategoryForm((d) => ({
      ...d,
      [key]: val,
    }));
  };

  const addCategoryHandler = () => {
    addCategoryFn({ ...addCategoryForm });
    setAddCategoryForm(DEF_CAT_STATE);
  };

  return (
    <>
      <button className="link-whitebg" onClick={handleToggleDrawer}>
        Manage Categories
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <h2 className="drawer-heading">Manage Categories</h2>
        <div className="drawer-content">
          <div className="add-category-header">
            <button
              className="link pr0"
              onClick={() => setIsAddCategoryOpen((s) => !s)}
            >
              <AddIcon className="icon-blue" height="12px" width="12px" /> Add
              Category
            </button>
          </div>

          {isAddCategoryOpen && (
            <div className="add-category">
              <div className="input-label">Category Name</div>
              <input
                value={addCategoryForm.name}
                onChange={(e) => inputHandler(e.target.value, "name")}
              />

              <div className="input-label mt15">Type</div>
              <select
                value={addCategoryForm.type}
                onChange={(e) => inputHandler(e.target.value, "type")}
              >
                <option value="expenditure">Expenditure</option>
                <option value="investment">Investment</option>
              </select>

              <div className="input-label  mt15">Category Limit</div>
              <input
                value={addCategoryForm.limit}
                onChange={(e) => inputHandler(e.target.value, "limit")}
              />

              <button className="primary mt15" onClick={addCategoryHandler}>
                Add Category
              </button>
            </div>
          )}

          <div>
            <h5>Expense Categories</h5>

            <div className="list-container">
              {categories &&
                categories.data &&
                categories.data
                  .filter((category) => category.type === "expenditure")
                  .map((category) => (
                    <div className="list-container-row">
                      <div className="list-container-column">
                        {category.name}
                      </div>
                      <div className="list-container-column">
                        {category.limit}
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="mt30">
            <h5>Investment Categories</h5>

            <div className="list-container">
              {categories &&
                categories.data &&
                categories.data
                  .filter((category) => category.type === "investment")
                  .map((category) => (
                    <div className="list-container-row">
                      <div className="list-container-column">
                        {category.name}
                      </div>
                      <div className="list-container-column">
                        {category.limit}
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

export default ManageCategories;
