import FriendCard from "./FriendCard";
import css from "./style.module.css";

interface DisplayLayoutProps {
  text: string;
  datas: User[] | null;
  primaryButtonProps: ButtonProps;
  secondaryButtonProps: ButtonProps;
  setFriendID: (id: string) => void;
}

const DisplayLayout: React.FC<DisplayLayoutProps> = ({ text, datas, primaryButtonProps, secondaryButtonProps, setFriendID }) => {
  return (
    <div className={css.displayContainer}>
      <h3 style={{ textAlign: "start", marginBottom: "1rem" }}>{text}</h3>

      <div className={css.gridDisplay}>
        {datas?.map((data) => (
          <FriendCard
            key={`${text}-${data.id}`} // Use a unique key by combining text and data.id
            user={data}
            primaryButtonProps={primaryButtonProps}
            secondaryButtonProps={secondaryButtonProps}
            setFriendID={setFriendID}
            isProfile={false}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayLayout;
