import { Navigate } from "react-router-dom";
import { AuthContext } from "../context-manager/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import LoadingPage from "../../pages/loading";

interface AuthorizedRouteProps {
  children: React.ReactNode;
}

export const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;
  const [isLoading, setIsLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    setAuthorized(isAuth);
    setIsLoading(false);
  }, [isAuth]);


  if (isLoading) {
    return <LoadingPage />;
  }

  if (!authorized) {
    return <Navigate to="/signin" />;
  }

  return children;
};
