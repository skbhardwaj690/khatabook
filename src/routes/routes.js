import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "../pages/auth_screens/login";
import { Register } from "../pages/auth_screens/register";
import { AllData } from "../pages/core/all_transactions";
import { Transaction } from "../pages/core/transaction";
import { AddTransaction } from "../pages/core/add_transaction";
import { ErrorPage } from "../components/errorpage";
import { Protected } from "../protected";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Navigate to={"/transactions"} />} />

      {/* Public routes :- */}
      <Route
        path="login"
        element={<Protected public={true} component={<Login />} />}
      ></Route>
      <Route
        path="register"
        element={<Protected public={true} component={<Register />} />}
      ></Route>

      {/* Protected routes :- */}
      <Route path="transactions">
        <Route path="" element={<Protected component={<AllData />} />}></Route>
        <Route
          path=":id"
          element={<Protected component={<Transaction />} />}
        ></Route>
        <Route
          path="create"
          element={<Protected component={<AddTransaction />} />}
        ></Route>
        <Route
          path="edit/:id"
          element={<Protected component={<AddTransaction />} />}
        ></Route>
      </Route>

      {/* Any other routes */}
      <Route path="/*" element={<ErrorPage />}></Route>
    </Route>
  )
);
