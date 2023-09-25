import React, { useContext, useEffect, useState } from "react";
import DropdownDateOfBirth from "./components/DobComponent/DropdownDateOfBirth";
import RadioGender from "./components/GenderComponent/RadioGender";
import Disclaimer from "./components/DisclaimerComponent/Disclaimer";
import css from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "./mutation";
import { formatDateToString } from "./utils";
import { DateOfBirth } from "./model";
import { AuthContext } from "../../setup/context-manager/AuthContextProvider";
import emailjs from "@emailjs/browser";
import LoadingPage from "../loading";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);

  const initialDOB = {
    year: "2023",
    month: "January",
    day: "1",
  };

  const [addUser, { loading }] = useMutation(ADD_USER);
  const [dob, setDOB] = useState(initialDOB);
  const [gender, setGender] = useState("");
  const [errorMessege, setErrorMessege] = useState("");

  if (loading) return <LoadingPage />;

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputUser = {
      firstName: event.currentTarget["first-name"].value,
      surename: event.currentTarget["surename"].value,
      email: event.currentTarget["email"].value,
      password: event.currentTarget["password"].value,
      dob: formatDateToString(dob),
      gender: gender,
      profileURL: "",
      isAuth: false,
    };

    if (inputUser.firstName === "" || inputUser.surename === "" || inputUser.email === "" || inputUser.password === "" || inputUser.dob === "" || inputUser.gender === "") {
      setErrorMessege("all field must be filled");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputUser.email)) {
      setErrorMessege("email must be email format");
      return;
    }
    console.log(inputUser.password);

    if (inputUser.password.length < 8) {
      setErrorMessege("password must be minimum 8 characters");
      return;
    }

    const letterPattern = /[a-zA-Z]/;
    const numberPattern = /[0-9]/;

    if (!letterPattern.test(inputUser.password) || !numberPattern.test(inputUser.password)) {
      setErrorMessege("Password must be alphanumeric");
      return;
    }

    try {
      await addUser({
        variables: {
          inputUser: inputUser,
        },
      }).then(async (response) => {
        const Params = {
          to_name: inputUser.firstName + " " + inputUser.surename,
          link: "localhost:5173/activate/" + response.data.createUser.id,
          reply_to: "",
          to_email: inputUser.email,
        };
        navigate("/");

        await emailjs
          .send("service_9wq9gdc", "template_e1tmi5y", Params, "M8zg-2CmLpt_Abzv7")
          .then((response) => {
            console.log("Email sent successfully:", response);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes("email has been used")) {
        setErrorMessege("email has been used.");
      } else {
        setErrorMessege("error: " + error.message);
      }
    }
  };

  const handleDOBChange = (updatedDOB: DateOfBirth) => {
    setDOB(updatedDOB);
  };

  return (
    <>
      <div className={css.container}>
        <h1 className={css.header}>Facebook</h1>
        <form onSubmit={handleSignup} className={`${css.card} ${css.form}`}>
          <h3 className={css.title}>Create New Account</h3>
          <div className={css.nameContainer}>
            <input className={css.textInput} type="text" placeholder="First name" id="first-name" />
            <input className={css.textInput} type="text" placeholder="Surname" id="surename" />
          </div>
          <input className={css.textInput} type="text" placeholder="Mobile number or email address" id="email" />
          <input className={css.textInput} type="password" placeholder="New password" id="password" />
          <DropdownDateOfBirth dob={dob} setDOB={handleDOBChange} />
          <RadioGender gender={gender} setGender={setGender} />
          <Disclaimer />
          {errorMessege !== "" && <h6 style={{ color: "red", fontWeight: "500", fontStyle: "italic" }}>{errorMessege}</h6>}
          <button type="submit" className={css.loginBtn}>
            Sign up
          </button>
          <Link to="/" className={css.redirectLink}>
            Already have an account
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
