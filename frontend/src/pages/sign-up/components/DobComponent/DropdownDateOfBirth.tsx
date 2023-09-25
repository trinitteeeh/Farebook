import React from "react";
import css from "./style.module.css";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface DropdownDateOfBirthProps {
  dob: { year: string; month: string; day: string };
  setDOB: (dob: { year: string; month: string; day: string }) => void;
}

const DropdownDateOfBirth: React.FC<DropdownDateOfBirthProps> = ({ dob, setDOB }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDOB({ ...dob, [name]: value });
  };

  return (
    <div className={css.container}>
      <label className={css.label}>Date of Birth:</label>
      <div className={css.selectContainer}>
        <select className={css.select} name="year" value={dob.year} onChange={handleOnChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select className={css.select} name="month" value={dob.month} onChange={handleOnChange}>
          {months.map((month, index) => (
            <option key={index + 1} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <select className={css.select} name="day" value={dob.day} onChange={handleOnChange}>
          {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownDateOfBirth;
