import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Root/MainLayout";
import ErrorPage from "../Components/ErrorPage";
import Home from "../Pages/Home/Home";
import AllListings from "../Pages/AllListings";
import PrivateRoute from "./PrivateRoute";
import ListingDetails from "../Pages/ListingDetails";
import SignUp from "../Components/SignUp";
import LogIn from "../Components/LogIn";
import Dashboard from "../Root/Dashboard";
import AdminRoute from "./AdminRoute";
import Statistics from "../Pages/AdminDashboardPages/Statistics";
import AllUsers from "../Pages/AdminDashboardPages/AllUsers";
import AdminAllProducts from "../Pages/AdminDashboardPages/AdminAllProducts";
import SellYourCar from "../Pages/UserDashboardPages/SellYourCar";
import UserProfile from "../Pages/UserDashboardPages/UserProfile";
import MyListings from "../Pages/UserDashboardPages/MyListings";
import UpdateListing from "../Pages/UserDashboardPages/UpdateListing";
import SavedListings from "../Pages/UserDashboardPages/SavedListings";
import BidsForAListing from "../Pages/UserDashboardPages/BidsForAListing";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allListings",
        element: <AllListings />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  // dashboard router
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // admin dashboard router
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "adminAllProducts",
        element: (
          <AdminRoute>
            <AdminAllProducts />
          </AdminRoute>
        ),
      },
      // user dashboard router
      {
        path: "sellCar",
        element: <SellYourCar />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "myListings",
        element: <MyListings />,
      },
      {
        path: "updateListing/:id",
        element: <UpdateListing />,
      },
      {
        path: "savedListings",
        element: <SavedListings />,
      },
      {
        path: "bids/:id",
        element: <BidsForAListing />,
      },
    ],
  },
]);

export default Router;
