import { useState } from "react";
import { AddIcon } from "../../icons/icons";
import Drawer from "../Drawer";
import "./style.css";

const ManageCategories = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <button className="link" onClick={handleToggleDrawer}>
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
              <input />

              <div className="input-label mt15">Type</div>
              <select>
                <option value="Value1">Value 1</option>
              </select>

              <div className="input-label  mt15">Category Limit</div>
              <input />

              <button className="primary mt15">Add Category</button>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default ManageCategories;
