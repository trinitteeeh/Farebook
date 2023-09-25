import React from "react";
import css from "../style.module.css";

interface ColorPaletteProps {
  cssStyle: CssStyle;
  setBackgound: (cssStyle: CssStyle) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ cssStyle, setBackgound }) => {
  const handleClick = () => {
    setBackgound(cssStyle);
  };

  return <div className={css.colorPalettePicker} style={{ ...cssStyle }} onClick={handleClick}></div>;
};

const BackgroundPicker: React.FC<{ setBackgound: (cssStyle: CssStyle) => void }> = ({ setBackgound }) => {
  const backgroundStyles: CssStyle[] = [
    { backgroundImage: "linear-gradient(to right, #4caefe, #3d73e7)" },
    { backgroundImage: "linear-gradient(to right, #f9a826, #f5515f)" },
    { backgroundImage: "linear-gradient(to right, #0f4c81, #96c93d)" },
    { backgroundImage: "linear-gradient(to right, #f37055, #f10096)" },
    { backgroundImage: "linear-gradient(to right, #44af69, #e94f37)" },
    { backgroundImage: "linear-gradient(to right, #ff9a8b, #8d65ff)" },
    { backgroundImage: "radial-gradient(circle, #ff6b6b, #ffa671)" },
    { backgroundImage: "linear-gradient(to right, #56ab2f, #a8e063)" },
    { backgroundImage: "linear-gradient(to right, #fc4a1a, #f7b733)" },
    { backgroundImage: "linear-gradient(to right, #3f5efb, #fc466b)" },
    { backgroundImage: "linear-gradient(to right, #ff0844, #ffb199)" },
    { backgroundImage: "radial-gradient(circle, #f38181, #fce38a)" },
    { backgroundImage: "linear-gradient(to right, #fa709a, #fee140)" },
    { backgroundImage: "linear-gradient(to right, #16a085, #f4d03f)" },
    { backgroundColor: "#3498db" },
    { backgroundImage: "linear-gradient(to right, #8e44ad, #2ecc71)" },
    { backgroundImage: "linear-gradient(to right, #00c6ff, #0072ff)" },
    { backgroundImage: "radial-gradient(circle, #fdbb2d, #22c1c3)" },
    { backgroundImage: "linear-gradient(to right, #ff8008, #ffc837)" },
    { backgroundColor: "#e74c3c" },
    { backgroundImage: "linear-gradient(to right, #00695c, #28a745)" },
  ];

  return (
    <div className={css.backgroundContainer}>
      <h4 style={{ textAlign: "start" }}>Backgrounds</h4>
      <div className={css.colorContainer}>
        {backgroundStyles.map((style, index) => (
          <ColorPalette key={index} cssStyle={style} setBackgound={setBackgound} />
        ))}
      </div>
    </div>
  );
};

export default BackgroundPicker;
