import css from "./style.module.css";

interface OptionMenuProps {
  text: string;
  isActive: boolean;
}

const OptionMenu: React.FC<OptionMenuProps> = ({ text, isActive }) => {
  return (
    <div className={`${css.wrapper} ${isActive ? css.active : ""}`}>
      <div className={`${css.container}`}>
        <h4 style={{ color: isActive ? "#477ef3" : "inherit" }}>{text}</h4>
      </div>
    </div>
  );
};

export default OptionMenu;
