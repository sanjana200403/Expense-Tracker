import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_Data = [
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
