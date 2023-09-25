import { useState } from "react";
import css from "./style.module.css";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "./query";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

export default function ForgetAccountPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSucess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);
  const navigate = useNavigate();

  

  const handleCancel = () => {};

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const emailValue = email;

    console.log(emailValue);
    try {
      await getUserByEmail({ variables: { email: emailValue } }).then((result) => {
        if (result.error?.message === "record not found") {
          setMessage("User not Found");
        } else {
          setUser(result.data.getUserByEmail);
          setMessage("");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgetPassword = async () => {
    const Params = {
      to_name: user?.firstName + " " + user?.surename,
      link: "localhost:5173/reset-password/" + user?.id,
      to_email: user?.email,
    };

    setMessage("Loading...");

    await emailjs
      .send("service_9wq9gdc", "template_hw33qy2", Params, "M8zg-2CmLpt_Abzv7")
      .then((response) => {
        console.log("Email sent successfully:", response);
        setSucess(true);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className={css.container}>
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
              <h3>Find Your Account</h3>
            </div>
            <div className={css.cardContent}>
              <h4>Please enter your email address to search for your account.</h4>
              <form onSubmit={handleSubmit} className={css.form}>
                <input type="text" className={css.searchbar} placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </form>
              <h4 className={css.message}>{message}</h4>
              {user !== null && (
                <div className={css.userCard}>
                  <div className={css.profile}>
                    <img src={user.profileURL !== "" ? user.profileURL : "/assets/blank-profile.png"} alt="" />
                  </div>
                  <div className={css.userDescription}>
                    <h4>{user.firstName + " " + user.surename}</h4>
                    <div className={css.profileAction}>
                      <button onClick={handleForgetPassword}>Forget Password</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={css.cardAction}>
              <button style={{ backgroundColor: "#e4e6ea", color: "#4b4f55" }} onClick={handleCancel}>
                Cancel
              </button>
              <button style={{ backgroundColor: "#4077f2", color: "#ffffff" }} onClick={handleSubmit}>
                Search
              </button>
            </div>
          </div>
        ) : (
          <div className={css.card}>
            <div className={css.cardHeader}>
              <h3>Find Your Account</h3>
            </div>
            <div className={css.cardContent}>
              <h4>Reset password email has been sent to your account.</h4>
            </div>
            <div className={css.cardAction}>
              <button style={{ backgroundColor: "#4077f2", color: "#ffffff" }} onClick={() => navigate("/signin")}>
                Back to login page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
