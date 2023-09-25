import css from "../PhotoDisplay/style.module.css";
import FriendCard from "../../../friends/components/FriendCard";

interface FriendDisplayProps {
  friends: User[] | null;
}

const FriendDisplay: React.FC<FriendDisplayProps> = ({ friends }) => {
  const setFriendID = () => {};

  return (
    <div className={css.container}>
      <h2 style={{ textAlign: "start", marginBottom: "2vh" }}>Friends</h2>
      <div className={css.gridContainer}>
        {friends?.map((friend) => (
          <FriendCard
            user={friend}
            primaryButtonProps={{ text: "", color: "#ffffff", backgroundColor: "#3c74e3" }}
            secondaryButtonProps={{ text: "", color: "#030303", backgroundColor: "#e4e6ea" }}
            setFriendID={setFriendID}
            isProfile={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendDisplay;
