import { useEffect, useState } from "react";
import Button from "../../../common/components/Button";
import css from "./style.module.css";

interface FriendCardProps {
  user: User;
  primaryButtonProps: ButtonProps;
  secondaryButtonProps: ButtonProps;
  setFriendID: (id: string) => void;
  isProfile: boolean;
}

const FriendCard: React.FC<FriendCardProps> = ({ user, primaryButtonProps, secondaryButtonProps, setFriendID, isProfile }) => {
  const [primaryButtonClicked, setPrimaryButtonClicked] = useState(false);
  const [secondaryButtonClicked, setSecondaryButtonClicked] = useState(false);
  const handlePrimaryButtonClick = () => {
    setFriendID(user.id);
    setPrimaryButtonClicked(true);
  };

  const handleSecondaryButtonClick = () => {
    setFriendID(user.id);
    setSecondaryButtonClicked(true);
  };

  useEffect(() => {
    if (primaryButtonProps.onClick && primaryButtonClicked) {
      primaryButtonProps.onClick();
      setPrimaryButtonClicked(false);
    }
  }, [primaryButtonClicked, primaryButtonProps]);

  useEffect(() => {
    if (secondaryButtonProps.onClick && secondaryButtonClicked) {
      secondaryButtonProps.onClick();
      setSecondaryButtonClicked(false);
    }
  }, [secondaryButtonClicked, secondaryButtonProps]);

  return (
    <>
      <div className={css.friendCardContainer}>
        <div className={css.topPart} style={{ height: isProfile ? "90%" : "50%" }}>
          <img src={user.profileURL !== "" ? user.profileURL : "/assets/blank-profile.png"} alt="" />
        </div>
        <div className={css.botomPart}>
          <h4 style={{ textAlign: "start", fontSize: "1.1rem", fontWeight: "700" }}>{user.firstName + " " + user.surename}</h4>

          <div className={css.actionContainer}>
            {primaryButtonProps.text !== "" && <Button text={primaryButtonProps.text} backgroundColor={primaryButtonProps.backgroundColor} color={primaryButtonProps.color} onClick={handlePrimaryButtonClick}></Button>}

            {secondaryButtonProps.text !== "" && <Button text={secondaryButtonProps.text} backgroundColor={secondaryButtonProps.backgroundColor} color={secondaryButtonProps.color} onClick={handleSecondaryButtonClick}></Button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
