import { useMutation } from "@apollo/client";
import css from "./style.module.css";
import { ACTIVATE_ACCOUNT } from "./mutation";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../loading";
import ErrorPage from "../error";

export default function ActivationPage() {
  const { id } = useParams<{ id: string }>();
  const [activateAccount, { loading, error }] = useMutation(ACTIVATE_ACCOUNT);
  const navigate = useNavigate();

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  const handleActivateAccount = async () => {
    try {
      await activateAccount({
        variables: {
          id: id,
        },
      }).then(() => {
        navigate("/signin");
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={css.container}>
      <h1 style={{ color: "#487cf4" }}>Account Activation</h1>
      <div className={css.activateBtn} onClick={handleActivateAccount}>
        Activate Your Account
      </div>
    </div>
  );
}
