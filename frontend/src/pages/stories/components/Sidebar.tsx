import { AiOutlineClose } from "react-icons/ai";
import css from "./style.module.css";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface StorySidebarProps {}

const StorySidebar: React.FC<StorySidebarProps> = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={css.sidebar}>
        <div className={css.sidebarIconContainer}>
          <div className={css.icon} style={{ backgroundColor: "#a3a3a3" }} onClick={() => navigate("/home")}>
            <AiOutlineClose />
          </div>
          <div className={css.icon} style={{ background: "linear-gradient(to bottom, #4caefe, #3d73e7)", padding: 0 }}>
            <FaFacebookF />
          </div>
        </div>
        <h2 className={css.profileHeader} style={{ textAlign: "start" }}>
          Stories
        </h2>
      </div>
    </>
  );
};

export default StorySidebar;
