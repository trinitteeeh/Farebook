import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import css from "./style.module.css";

interface ProfileProps {
  user: User | null;
  friendsPicture: string[];
  setShowSuggesstion: (status: boolean) => void;
  showSuggesstion: boolean;
  currentUser: User;
  isCurrentUser: boolean;
  isFriend: boolean;
}

const Profile: React.FC<ProfileProps> = ({ user, friendsPicture, setShowSuggesstion, showSuggesstion, currentUser, isCurrentUser, isFriend }) => {
  const handleCreateMessage = () => {
    
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.leftSide}>
          <div className={css.profileImage}>
            <img src={user?.profileURL} alt="" />
          </div>
          <h2 style={{ textAlign: "start", fontSize: "2rem" }}>{user?.firstName + " " + user?.surename}</h2>
          <h4 style={{ textAlign: "start" }}> {friendsPicture.length} friends</h4>
          <div className={css.friendImageContainer}>
            {friendsPicture.map((pict, index) => (
              <div key={index} className={css.friendImage}>
                <img src={pict} alt={`Friend ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className={css.rightSide}>
          {isCurrentUser ? (
            <>
              <button style={{ backgroundColor: "#3c74e3", color: "#ffffff", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>Add to Story</button>
              <button style={{ backgroundColor: "#e4e6ea", color: "#000000", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>Edit Profile</button>
            </>
          ) : (
            <>
              {isFriend && <button style={{ backgroundColor: "#e4e6ea", color: "#000000", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>Add Friend</button>}

              <button style={{ backgroundColor: "#3c74e3", color: "#ffffff", height: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>Message</button>
            </>
          )}
          <button style={{ backgroundColor: "#e4e6ea", color: "#000000", height: "30%", display: "flex", justifyContent: "center", alignItems: "center", padding: "0" }} onClick={() => setShowSuggesstion(!showSuggesstion)}>
            {!showSuggesstion && <RiArrowDropDownLine style={{ width: "2rem", height: "2rem" }} />}
            {showSuggesstion && <RiArrowDropUpLine style={{ width: "2rem", height: "2rem" }} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
