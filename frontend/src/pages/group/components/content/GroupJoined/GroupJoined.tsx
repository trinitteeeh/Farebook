import { useQuery } from "@apollo/client";
import css from "./style.module.css";
import { GET_GROUP_BY_USER_ID } from "../../../query";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface GroupJoinedProps {
  userID: string;
  setDisplayState: (display: number) => void;
}

const GroupJoined: React.FC<GroupJoinedProps> = ({ userID, setDisplayState }) => {
  const { data: joinedData, loading: joinedLoading } = useQuery(GET_GROUP_BY_USER_ID, {
    variables: { userID: userID },
  });
  const navigate = useNavigate();

  if (joinedLoading) {
    return <p>Loading</p>;
  }

  if (!joinedData) return;
  return (
    <div className={css.container}>
      <h4 style={{ textAlign: "start", marginBottom: "2vh" }}>All groups you've joined ({joinedData.getGroupsByUserID.length})</h4>
      <div className={css.groupDisplayContainer}>
        {joinedData.getGroupsByUserID.map((group: Group) => (
          <div
            className={css.group}
            onClick={() => {
              navigate("/group/profile/" + group.id);
              setDisplayState(3);
            }}
          >
            <div className={css.topPart}>
              <div className={css.profile}>
                <img src={group.profileURL !== "" ? group.profileURL : "/assets/facebook_group_profile.png"} alt="" />
              </div>
              <div style={{ position: "relative", flex: "1" }}>
                <h5 style={{ fontSize: "1.2rem" }}>{group.name}</h5>
                <h5 style={{ fontWeight: "400", position: "absolute", bottom: "0", left: "0" }}>{group.description}</h5>
              </div>
            </div>
            <div className={css.bottomPart}>
              <div className={css.viewGroup}>View Group</div>
              <div className={css.moreIcon}>
                <FiMoreHorizontal />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupJoined;
