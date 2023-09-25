import css from "./style.module.css";
import { CiDesktop, CiMobile1 } from "react-icons/ci";

interface PreviewProps {
  privacy: string;
  name: string;
  display: number;
  setDisplay: (display: number) => void;
}

const Preview: React.FC<PreviewProps> = ({ privacy, name, display, setDisplay }) => {
  return (
    <div className={`${css.container} ${display === 1 ? css.mobile : ""}`}>
      <div className={`${css.preview} `}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 style={{ textAlign: "start" }}>{display === 0 ? "Desktop" : "Mobile"} Preview</h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={`${css.icon} ${display === 0 ? css.active : ""}`} onClick={() => setDisplay(0)}>
              <CiDesktop />
            </div>
            <div className={`${css.icon} ${display === 1 ? css.active : ""}`} onClick={() => setDisplay(1)}>
              <CiMobile1 />
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.background}>
            <img src="/assets/facebook_group_profile.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
