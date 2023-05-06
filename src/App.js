import { RouterProvider } from "react-router-dom";

import { routes } from "./routes/routes";
import "./assets/styles/common.css"

export default function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}
