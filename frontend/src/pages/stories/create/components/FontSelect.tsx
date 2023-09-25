import { useState } from "react";
import css from "../style.module.css";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";

interface CustomSelectProps {
  setSelectedFont: (font: FontType) => void;
  selectedFont: FontType | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ setSelectedFont, selectedFont }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fonts = [
    { value: "Helvetica", label: "Simple" },
    { value: "Roboto", label: "Clean" },
    { value: "Cursive", label: "Casual" },
    { value: "Great Vibes", label: "Fancy" },
    { value: "Impact", label: "Headline" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFontSelect = (fontValue: FontType) => {
    setSelectedFont(fontValue);
    setIsOpen(false);
  };

  return (
    <div className={css.fontContainer}>
      <div className={css.customSelect} onClick={toggleDropdown}>
        <div>
          <RxLetterCaseCapitalize style={{ width: 15, height: 15, marginRight: "1vw" }} />
          {selectedFont?.label || "Select a font"}
        </div>

        <MdArrowDropDown style={{ width: 30, height: 30 }} />
      </div>
      {isOpen && (
        <ul className={css.dropdownList}>
          {fonts.map((font) => (
            <li key={font.value} onClick={() => handleFontSelect(font)} style={{ listStyle: "none", textAlign: "start" }}>
              {font.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
