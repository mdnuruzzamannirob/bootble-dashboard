import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout & Guards
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Auth Pages
import Login from "../components/Logout/Login";
import ForgotPassword from "../components/Logout/ForgotPassword";
import CheckYourEmail from "../components/Logout/CheckYourEmail";
import SetPassword from "../components/Logout/SetPassword";

// Main Dashboard Pages
import Dashboard from "../components/Dashboard/Dashboard";
import User from "../components/User/User";
import Category from "../components/Category/Category";
import Products from "../components/Products/Products";
import Subscriptions from "../components/Subscriptions/Subscriptions";
import Meditation from "../components/Meditation/Meditation";
import Transaction from "../components/Transaction/Transaction";
import Notification from "../components/Notification/Notification";

// Help & Support Pages
import HelpCenterPage from "../components/Dashboard/HelpCenterPage/HelpCenterPage";
import HelpSupport from "../components/HelpFAQs/HelpSupport";
import Support from "../components/Dashboard/Support";
import FAQs from "../components/HelpFAQs/FAQs";

// Settings & Profile
import Profile from "../components/Profile/Profile";
import AboutUs from "../components/Settings/AboutUs";
import TermsConditions from "../components/Settings/TermsConditions";
import PrivacyPolicy from "../components/Settings/PrivacyPolicy";
import UserDetails from "@/components/User/UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/user-management",
        children: [
          {
            index: true,
            element: <User />,
          },
          {
            path: ":id",
            element: <UserDetails />,
          },
        ],
      },
      { path: "/category", element: <Category /> },
      { path: "/products", element: <Products /> },
      { path: "/subscriptions", element: <Subscriptions /> },
      { path: "/add-meditation", element: <Meditation /> },
      { path: "/transaction", element: <Transaction /> },
      { path: "/notifications", element: <Notification /> },

      // Help & Support
      { path: "/help-center", element: <HelpCenterPage /> },
      { path: "/help-support", element: <HelpSupport /> },
      { path: "/contact-support", element: <Support /> },
      { path: "/FAQs", element: <FAQs /> },

      // Profile & Settings
      { path: "/profile", element: <Profile /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/terms-conditions", element: <TermsConditions /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },

      // 404 Redirect
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  // --- Auth / Public Routes ---
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/check-email",
    element: (
      <PublicRoute>
        <CheckYourEmail />
      </PublicRoute>
    ),
  },
  {
    path: "/set-password",
    element: (
      <PublicRoute>
        <SetPassword />
      </PublicRoute>
    ),
  },
]);

export default router;
