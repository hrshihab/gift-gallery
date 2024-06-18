import { MdDashboard, MdShoppingCart } from "react-icons/md";
import GiftProducts from "../pages/GiftProducts";
import Dashboard from "../pages/Dashboard";
import { RiCoupon2Fill } from "react-icons/ri";
import Coupons from "../pages/Coupons";

export const sellerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: MdDashboard,
        element: <Dashboard />,
    },
    {
        name: "Gift List",
        path: "gift-list",
        icon: MdShoppingCart,
        element: <GiftProducts />,
    },
    {
        name: "Coupon List",
        path: "coupon-list",
        icon: RiCoupon2Fill,
        element: <Coupons />,
    },
];
