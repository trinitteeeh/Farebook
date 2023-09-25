import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN } from "./mutation";
import css from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";
import CryptoJS from "crypto-js";
import { GETUSER } from "../../setup/auth/query";

function SignInPage() {
  const [login] = useMutation(LOGIN);
  const [getUser, { data }] = useLazyQuery(GETUSER);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { setToken, setIsAuth, setUser } = authContext;
  const [error, setError] = useState("");

  useEffect(() => {
    if (data?.getUserByToken) {
      setUser(data.getUserByToken);
      navigate("/");
    }
  }, [data, setUser, navigate]);

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;

    try {
      //login == mutation
      await login({
        variables: {
          email: email,
          password: password,
        },
      }).then((result) => {
        console.log(result);
        if (result.data.login === "Wrong password") {
          setError("Invalid Credentials");
        } else if (result.data.login === "Account has not been verified") {
          setError("Account has not been verified");
        } else {
          const jwtToken = result.data.login;
          const secretPass = "XkhZG4fW2t2W";
          setError("");

          try {
            const hashedToken = CryptoJS.AES.encrypt(JSON.stringify(jwtToken), secretPass).toString();
            setCookie("token", hashedToken);
            setToken(jwtToken);
            setIsAuth(true);

            // Fetch user data based on JWT token
            getUser({
              variables: { token: jwtToken },
            });
          } catch (hashError) {
            console.error("Error hashing token:", hashError);
          }
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes("user not found")) {
        setError("Email is not registered");
      }
    }
  };

  function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}`;
  }

  return (
    <>
      <div className={css.container}>
        <h1 className={css.header}>Facebook</h1>
        <form onSubmit={handleSignin} className={`${css.card} ${css.form}`}>
          <h3 className={css.title}>Log in to Facebook</h3>
          <input className={css.textInput} type="text" placeholder="Email address or phone number" id="email" />
          <input className={css.textInput} type="password" placeholder="Password" id="password" />
          <button type="submit" className={css.loginBtn}>
            Log in
          </button>
          {error !== "" && <div className={css.errLabel}>{error}</div>}
          <Link to="/forget-account" className={css.redirectLink}>
            Forgot Your Password?
          </Link>
          <h6 className={css.text}>or</h6>
          <Link to="/signup">
            <button className={css.createAccBtn}>Create new account</button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignInPage;
