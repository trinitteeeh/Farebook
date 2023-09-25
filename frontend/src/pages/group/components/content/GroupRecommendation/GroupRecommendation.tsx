import { useQuery } from "@apollo/client";
import css from "./style.module.css";
import { GET_GROUP_RECOMMENDATION } from "../../../query";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface GroupRecommendationProps {
  userID: string;
  setDisplayState: (display: number) => void;
}

const GroupRecommendation: React.FC<GroupRecommendationProps> = ({ userID, setDisplayState }) => {
  const { data: recommendedData, loading: recommendedLoading } = useQuery(GET_GROUP_RECOMMENDATION, {
    variables: { userID: userID },
  });
  const navigate = useNavigate();

  if (recommendedLoading) {
    return <p>Loading</p>;
  }

  if (!recommendedData) return;
  return (
    <div className={css.container}>
      <h4 style={{ textAlign: "start", marginBottom: "2vh" }}>Group Recommendation </h4>
      <div className={css.groupDisplayContainer}>
        {recommendedData.getGroupRecommendation.slice(0, 6).map((group: Group) => (
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

export default GroupRecommendation;
