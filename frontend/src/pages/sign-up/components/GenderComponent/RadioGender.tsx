import React from "react";
import css from "./style.module.css";

interface RadioGenderProps {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
}

const RadioGender: React.FC<RadioGenderProps> = ({ gender, setGender }) => {
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  return (
    <div className={css.container}>
      <label className={css.label}>Gender</label>
      <div className={css.radioContainer}>
        <label className={css.radioLabel}>
          <input type="radio" value="Male" checked={gender === "Male"} onChange={handleGenderChange} className={css.radioInput} />
          Male
        </label>
        <label className={css.radioLabel}>
          <input type="radio" value="Female" checked={gender === "Female"} onChange={handleGenderChange} className={css.radioInput} />
          Female
        </label>
        <label className={css.radioLabel}>
          <input type="radio" value="Custom" checked={gender === "Custom"} onChange={handleGenderChange} className={css.radioInput} />
          Custom
        </label>
      </div>
    </div>
  );
};

export default RadioGender;
