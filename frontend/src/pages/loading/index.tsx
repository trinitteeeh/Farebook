import css from "./style.module.css";

export default function LoadingPage() {
  return (
    <div className={css.container}>
      <h1>Loading...</h1>
      <div className={css.loadingOverlay}>
        <img src="/assets/load.gif" width="75px" height="75px" alt="Loading" />
      </div>
    </div>
  );
}
