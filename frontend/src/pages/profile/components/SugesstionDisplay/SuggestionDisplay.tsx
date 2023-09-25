import { useQuery } from "@apollo/client";
import Button from "../../../../common/components/Button";
import css from "./style.module.css";
import { GET_ALL_FRIEND_SUGGESTIONS } from "../../query";
import { useEffect, useState } from "react";

interface SuggestionDisplatProps {
  userID: string;
}

const SuggestionDisplay: React.FC<SuggestionDisplatProps> = ({ userID }) => {
  const [suggest, setSuggest] = useState<[User] | null>(null);

  const { data: suggestData, loading: suggestLoading } = useQuery(GET_ALL_FRIEND_SUGGESTIONS, {
    variables: { userID: userID },
  });

  useEffect(() => {
    if (suggestData && suggestData.getAllFriendSuggestions) {
      setSuggest(suggestData.getAllFriendSuggestions);
    }
  }, [suggestData]);

  if (suggestLoading) {
    return <div>Loading</div>;
  }
  if (!suggestData) return null;

  return (
    <div className={css.container}>
      <h3 style={{ textAlign: "start", margin: "0" }}>People you might know</h3>
      <div className={css.cardDisplayContainer}>
        {suggest?.map((suggestion) => (
          <div className={css.friendCard}>
            <div className={css.topPart}>
              <img src={suggestion.profileURL ? suggestion.profileURL : ""} alt="" />
            </div>
            <div className={css.bottomPart}>
              <h3 style={{ textAlign: "start", margin: "0" }}>{suggestion.firstName + " " + suggestion.surename}</h3>
              <h5 style={{ textAlign: "start", margin: "0", fontWeight: "400" }}>x mutual friends</h5>
              <Button text="Add Friend" backgroundColor="#e6f4ff" color="#4077f2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionDisplay;
