

const Button: React.FC<ButtonProps> = ({ text, onClick, color, backgroundColor }) => {
  return (
    <button onClick={onClick} style={{ color: color || "inherit", backgroundColor: backgroundColor || "inherit", flex: 1, minWidth: "fit-content", fontWeight: 700, width: "100%" }}>
      {text}
    </button>
  );
};

export default Button;
