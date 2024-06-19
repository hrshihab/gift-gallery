import AddProduct from "../pages/Manager/ProductManagement/AddProduct";
import CopyProduct from "../pages/Manager/ProductManagement/CopyProduct";
import UpdateProduct from "../pages/Manager/ProductManagement/UpdateProduct";
import Dashboard from "../pages/Dashboard";
import GiftProducts from "../pages/GiftProducts";
import {
    MdAddBusiness,
    MdDashboard,
    MdOutlineEditCalendar,
} from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import ManageGiftProducts from "../pages/ManageGiftProduct";

export const managerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: MdDashboard,
        element: <Dashboard />,
    },
    {
        name: "Gift List",
        path: "gift-list",
        icon: FaGift,
        element: <GiftProducts />,
    },

    {
        name: "Modify Gifts",
        path: "manage-gifts",
        icon: MdOutlineEditCalendar,
        element: <ManageGiftProducts />,
    },

    {
        name: "Add Gift",
        path: "add-gift",
        icon: MdAddBusiness,
        element: <AddProduct />,
    },

    {
        name: "Manage Gifts",
        icon: MdOutlineEditCalendar,
        children: [
            {
                path: "update-gift/:productId",
                element: <UpdateProduct />,
            },
            {
                path: "add-gift/copied/:productId",
                element: <CopyProduct />,
            },
        ],
    },
];
