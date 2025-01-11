import Home from "../pages/Home";
import AdminHome from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import UserHome from "../pages/user/UserLayout";
import UserDashboard from "../pages/user/Dashboard";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddProducts from "../pages/admin/AddProducts";
import AllProducts from "../pages/admin/AllProducts";
import Orders from "../pages/admin/Orders";

const RouteConfig = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/products",
    component: <Products />,
  },
  {
    path: "/product/:id",
    component: <ProductDetails />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
];

const AdminRouteConfig = [
  {
    path: "/admin",
    component: <AdminHome />,
    children: [
      {
        path: "dashboard",
        component: <AdminDashboard />,
      },
      {
        path: "orders",
        component: <Orders />,
      },
      {
        path: "product/add",
        component: <AddProducts />,
      },
      {
        path: "product/all",
        component: <AllProducts />,
      },
    ],
  },
];

const UserRouteConfig = [
  {
    path: "/user",
    component: <UserHome />,
    children: [
      {
        path: "dashboard",
        component: <UserDashboard />,
      },
    ],
  },
];

export { RouteConfig, AdminRouteConfig, UserRouteConfig };
