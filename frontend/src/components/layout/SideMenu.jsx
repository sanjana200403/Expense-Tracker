import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut
} from "react-icons/lu";
const SIDE_MENU_Data = [
    {
        id: "01",
        label: "Dashboard",
        icon: <LuLayoutDashboard size={20} />,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Income",
        icon: <LuWalletMinimal size={20} />,  
        path: "/income"
    },
    {
        id: "03",
        label: "Expense",
        icon: <LuHandCoins size={20} />,  
        path: "/expense"
    },
    {
        id: "04",
        label: "Logout",
        icon: <LuLogOut size={20} />,  
        path: "/logout"
    }
];


const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(SIDE_MENU_Data); 
  const handleClick = (route) => {
    if (route === "/logout") { 
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3">
        {user?.profileImageUrl && (
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={user?.profileImageUrl || ""}
            alt="Profile"
          />
        )}
        <h5 className="text-lg font-semibold">{user?.fullName || ""}</h5>
      </div>

      {/* Menu Items */}
      <div className="mt-8 flex flex-col gap-2">
        {SIDE_MENU_Data.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-2 rounded-md transition-all duration-200 ${
              activeMenu === item.label
                ? "text-white bg-primary"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
