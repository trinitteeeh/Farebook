import React, { ReactElement } from "react";
import css from "./style.module.css";
import { TbMathGreater } from "react-icons/tb";

interface FriendsFilterProps {
  icon: ReactElement;
  text: string;
}

const FriendsFilter: React.FC<FriendsFilterProps> = ({ icon, text }) => {
  return (
    <>
      <div className={css.filterContainer}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1vw" }}>
          <div className={css.icon}>{React.cloneElement(icon)}</div>
          <h3>{text}</h3>
        </div>
        <div className={css.iconPlain}>
          <TbMathGreater />
        </div>
      </div>
    </>
  );
};

export default FriendsFilter;
