import { useState } from "react";

import Drawer from "../Drawer";

const ManageCategories = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <button className="link" onClick={handleToggleDrawer}>
        Manage Categories
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <h2 className="drawer-heading">Drawer Content</h2>
        <p className="drawer-content">This is the content of the drawer.</p>
      </Drawer>
    </>
  );
};

export default ManageCategories;
