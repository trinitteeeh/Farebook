import { useState } from "react";
import css from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "./mutation";
import LoadingPage from "../loading";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSucess] = useState(false);
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);

    const submittedPassword = password;
    const submittedConfirmPassword = confirmPassword;

    if (submittedPassword !== submittedConfirmPassword) {
      setMessage("Password and confirm password does not match!");
      return;
    }

    console.log(id);
    console.log(submittedPassword);

    try {
      await resetPassword({
        variables: {
          id: id,
          newPassword: submittedPassword,
        },
      }).then(() => {
        setSucess(true);
        console.log("sukses");
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes("old password and new password are the same")) {
        setMessage("Old password and new password are the same.");
      } else {
        setMessage("An error occurred while resetting the password.");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className={css.container}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {" "}
          <div className={css.navigation}>
            <div className={css.logo}>
              <h4>Farebook</h4>
            </div>
            <div>
              <button style={{ backgroundColor: "#4077f2", color: "#ffffff", marginRight: "1rem" }} onClick={() => navigate("/signin")}>
                Back to Login
              </button>
            </div>
          </div>
          <div className={css.content}>
            {!success ? (
              <div className={css.card}>
                <div className={css.cardHeader}>
                  <h3>Reset Password</h3>
                </div>
                <div className={css.cardContent}>
                  <h4>Please input new password.</h4>
                  <form onSubmit={handleSubmit} className={css.form}>
                    <input type="password" className={css.searchbar} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <input type="password" className={css.searchbar} placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                  </form>
                  <h4 className={css.message}>{message}</h4>
                </div>
                <div className={css.cardAction}>
                  <button style={{ backgroundColor: "#4077f2", color: "#ffffff" }} onClick={handleSubmit}>
                    Confirm
                  </button>
                </div>
              </div>
            ) : (
              <div className={css.card}>
                <div className={css.cardHeader}>
                  <h3>Reset Password</h3>
                </div>
                <div className={css.cardContent}>
                  <h4 style={{ marginBottom: "2vh" }}>Password has been reseted</h4>
                </div>
                <div className={css.cardAction}>
                  <button style={{ backgroundColor: "#4077f2", color: "#ffffff" }} onClick={() => navigate("/signin")}>
                    Back to login page
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
