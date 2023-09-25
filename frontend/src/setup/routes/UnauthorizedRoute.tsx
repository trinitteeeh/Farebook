import { Navigate } from "react-router-dom";
import { AuthContext } from "../context-manager/AuthContextProvider";
import { useContext } from "react";

interface UnauthorizedRouteProps {
  children: React.ReactNode;
}

export const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};
