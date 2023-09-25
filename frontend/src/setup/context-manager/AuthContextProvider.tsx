import React, { createContext, useEffect, useState, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { GETUSER } from "../auth/query";
import CryptoJS from "crypto-js";
import LoadingPage from "../../pages/loading";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [getUserByToken] = useLazyQuery(GETUSER);

  useEffect(() => {
    const tokenCookie = getTokenFromCookie();

    async function fetchData() {
      if (tokenCookie) {
        const { data } = await getUserByToken({
          variables: { token: tokenCookie },
        });
        if (data) {
          setUser(data.getUserByToken);
          setIsAuth(true);
        }
      }
      setLoading(false); 
    }

    fetchData();
  }, [getUserByToken]);

  function getTokenFromCookie() {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        const secretPass = "XkhZG4fW2t2W";
        try {
          // console.log("value " + value);

          const decryptedBytes = CryptoJS.AES.decrypt(value, secretPass);
          const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

          const realToken = JSON.parse(decryptedToken);
          // console.log("result " + realToken);
          return realToken;
        } catch (error) {
          console.error("Error decrypting token:", error);
          return null;
        }
      }
    }
    return null;
  }

  const value: AuthContextType = useMemo(
    () => ({
      user,
      setUser,
      isAuth,
      setIsAuth,
      token,
      setToken,
    }),
    [isAuth, token, user]
  );

  if (loading) {
    return <LoadingPage />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
