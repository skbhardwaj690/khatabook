import { Navigate } from "react-router-dom";

export const Protected = (props) => {
  const Component = props.component;
  const isPublic = props.public;

  let auth_token = JSON.parse(localStorage.getItem("auth_token"));

  if (isPublic) {
    if (!auth_token) {
      return Component;
    } else {
      return <Navigate to={"/transactions"} />;
    }
  } else {
    if (auth_token) {
      return Component;
    } else {
      return <Navigate to="/login" />;
    }
  }
};
