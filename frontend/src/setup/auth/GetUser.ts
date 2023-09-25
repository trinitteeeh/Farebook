import { useQuery } from "@apollo/client";
import { GETUSER } from "./query";

export const useFetchUserData = (token: string | null) => {
  const { loading, error, data } = useQuery(GETUSER, {
    variables: { token: token },
    skip: !token,
    fetchPolicy: "network-only",
  });

  return {
    loading,
    error,
    user: data?.getUserByToken,
  };
};
