import React, { ReactElement } from "react";
import css from "./style.module.css";

interface MenuItemProps {
  logo: ReactElement;
  text: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ logo, text, onClick }) => {
  return (
    <div className={css.container} onClick={onClick}>
      {React.cloneElement(logo, { className: `${css.logo}` })}
      <h4>{text}</h4>
    </div>
  );
};

export default MenuItem;
