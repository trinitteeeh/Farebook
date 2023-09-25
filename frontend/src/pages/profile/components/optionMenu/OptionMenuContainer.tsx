import OptionMenu from "./OptionMenu";
import css from "./style.module.css";

interface OptionMenuContainerProps {
  setDisplayState: (state: number) => void;
  displayState: number;
}

const OptionMenuContainer: React.FC<OptionMenuContainerProps> = ({ setDisplayState, displayState }) => {
  return (
    <div className={css.optionMenuContainer}>
      <div onClick={() => setDisplayState(0)} style={{ height: "100%" }}>
        <OptionMenu text="Post" isActive={displayState === 0} />
      </div>
      <div onClick={() => setDisplayState(1)} style={{ height: "100%" }}>
        <OptionMenu text="About" isActive={displayState === 1} />
      </div>
      <div onClick={() => setDisplayState(2)} style={{ height: "100%" }}>
        <OptionMenu text="Friends" isActive={displayState === 2} />
      </div>
      <div onClick={() => setDisplayState(3)} style={{ height: "100%" }}>
        <OptionMenu text="Photos" isActive={displayState === 3} />
      </div>
      <div onClick={() => setDisplayState(4)} style={{ height: "100%" }}>
        <OptionMenu text="Videos" isActive={displayState === 4} />
      </div>
    </div>
  );
};

export default OptionMenuContainer;
