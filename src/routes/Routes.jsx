import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../components/Dashboard/Dashboard";
import HelpCenterPage from "../components/Dashboard/HelpCenterPage/HelpCenterPage";
import User from "../components/User/User";

import Category from "../components/Category/Category";
import Products from "../components/Products/Products";
import Notification from "../components/Notification/Notification";
import HelpSupport from "../components/HelpFAQs/HelpSupport";
import FAQs from "../components/HelpFAQs/FAQs";
import AboutUs from "../components/Settings/AboutUs";
import TermsConditions from "../components/Settings/TermsConditions";
import PrivacyPolicy from "../components/Settings/PrivacyPolicy";
import Profile from "../components/Profile/Profile";
import Login from "../components/Logout/Login";
import ForgetPassword from "../components/Logout/ForgetPassword";
import CheckYourEmail from "../components/Logout/CheckYourEmail";
import SetPassword from "../components/Logout/SetPassword";
import Support from "../components/Dashboard/Support";
import Transaction from "../components/Transaction/Transaction";
import Subscriptions from "../components/Subscriptions/Subscriptions";
import Meditation from "../components/Meditation/Meditation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/help-center",
        element: <HelpCenterPage></HelpCenterPage>,
      },
      {
        path: "/user-management",
        element: <User></User>,
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/add-meditation",
        element: <Meditation />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },

      {
        path: "/notifications",
        element: <Notification></Notification>,
      },
      {
        path: "/contact-support",
        element: <Support />,
      },

      {
        path: "/FAQs",
        element: <FAQs></FAQs>,
      },
      // {
      //   path: "/about",
      //   element: <AboutUs></AboutUs>,
      // },
      {
        path: "/terms-conditions",
        element: <TermsConditions></TermsConditions>,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: "/check-email",
    element: <CheckYourEmail></CheckYourEmail>,
  },
  {
    path: "/set-password",
    element: <SetPassword></SetPassword>,
  },
]);

export default router;
