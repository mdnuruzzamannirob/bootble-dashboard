import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import { StrictMode } from "react";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />{" "}
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </StrictMode>
);
