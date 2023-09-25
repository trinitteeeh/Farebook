import css from "./style.module.css";

interface ChatBubbleProps {
  text: string;
  user: User;
  currentUserID: string;
  mediaURL: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, user, currentUserID, mediaURL }) => {
  // console.log("text: " + text);
  // console.log("media URL: " + mediaURL);

  return (
    <>
      <div className={`${css.container} ${currentUserID === user.id ? css.ownContainer : ""}`}>
        {currentUserID !== user.id && (
          <div className={css.profilePicture}>
            <img src={user.profileURL ? user.profileURL : ""} alt="" />
          </div>
        )}

        <div className={css.contentContainer}>
          {text !== "" && (
            <div className={`${css.textContainer} ${currentUserID === user.id ? css.isOwnChat : ""} `}>
              <h5 style={{ fontWeight: "400" }}>{text}</h5>
            </div>
          )}

          {mediaURL !== "" && <div className={css.mediaBuble}>{mediaURL.includes(".webm") ? <audio src={mediaURL} controls loop /> : <img src={mediaURL} alt="" />}</div>}
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
