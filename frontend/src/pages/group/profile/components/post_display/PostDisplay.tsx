import css from "./style.module.css";
import GroupFeeds from "../../../components/content/Feeds/GroupFeeds";
import { AiFillLock, AiOutlineGlobal } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";

interface PostDisplayProps {
  user: User;
  group: Group;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ user, group }) => {
  const groups = [group];
  return (
    <div className={`${css.container} `}>
      <div className={css.leftDisplay}>
        <GroupFeeds groups={groups} user={user} isProfile={true} />
      </div>
      <div className={css.rightDisplay}>
        <div className={css.infoContainer}>
          <h4 style={{ textAlign: "start" }}>About</h4>
          <div className={css.description}>
            <h4>{group.description}</h4>
          </div>
          <div className={css.info}>
            {group.privacy === "Private" ? (
              <>
                {" "}
                <div className={css.icon}>
                  <AiFillLock />
                </div>
                <div>
                  <h4 style={{ textAlign: "start" }}>Private</h4>
                  <h5 style={{ textAlign: "justify", fontWeight: "400" }}>Only members can see who's in the group and what they post.</h5>
                </div>
              </>
            ) : (
              <>
                <div className={css.icon}>
                  <AiOutlineGlobal />
                </div>
                <div>
                  <h4 style={{ textAlign: "start" }}>Public</h4>
                  <h5 style={{ textAlign: "justify", fontWeight: "400" }}>all people can see who's in the group and what they post.</h5>
                </div>
              </>
            )}
          </div>
          <div className={css.info}>
            <div className={css.icon}>
              <BsFillPeopleFill />
            </div>
            <div>
              <h4 style={{ textAlign: "start" }}>Members</h4>
              <h5 style={{ textAlign: "justify", fontWeight: "400" }}>Has {group.members.length} members.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
