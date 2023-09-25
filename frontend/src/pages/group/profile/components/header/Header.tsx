import { RiArrowDropDownLine } from "react-icons/ri";
import css from "./style.module.css";
import OptionMenu from "../../../../profile/components/optionMenu/OptionMenu";

interface HeaderProps {
  profileURL: string;
  name: string;
  display: number;
  setDisplay: (display: number) => void;
  openInviteFriendDialog: (state: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ profileURL, name, display, setDisplay, openInviteFriendDialog }) => {
  return (
    <div className={css.container}>
      <div className={css.profilePicture}>
        <img src={profileURL !== "" ? profileURL : "/assets/facebook_group_profile.png"} alt="" />
      </div>
      <div className={css.titleContainerParent}>
        <div className={css.titleContainer}>
          <div className={css.title}>
            <h1>{name}</h1>
          </div>
          <div className={css.optionContainer}>
            <div className={css.inviteBtn} onClick={() => openInviteFriendDialog(true)}>
              Invite
            </div>
            <div className={css.dropdownBtn}>
              <RiArrowDropDownLine />
            </div>
          </div>
        </div>
      </div>
      <div className={css.menuContainer}>
        <div className={css.menu} onClick={() => setDisplay(0)}>
          <OptionMenu text="Discussion" isActive={display === 0} />
        </div>
        <div className={css.menu} onClick={() => setDisplay(1)}>
          <OptionMenu text="People" isActive={display === 1} />
        </div>
        <div className={css.menu} onClick={() => setDisplay(2)}>
          <OptionMenu text="Events" isActive={display === 2} />
        </div>
        <div className={css.menu} onClick={() => setDisplay(3)}>
          <OptionMenu text="Media" isActive={display === 3} />
        </div>
        <div className={css.menu} onClick={() => setDisplay(4)}>
          <OptionMenu text="Files" isActive={display === 4} />
        </div>
      </div>
    </div>
  );
};

export default Header;
