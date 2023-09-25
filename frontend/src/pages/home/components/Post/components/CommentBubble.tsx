import css from "./style.module.css";

interface CommentProps {
  id: string;
  isReply: boolean;
  username: string;
  commentText: string;
  textAreaRef: React.RefObject<HTMLInputElement>;
  profileURL: string;
  setCreateReply: (reply: boolean) => void;
  setParentComment: (parentID: string) => void;
  setCommentWriter: (parentID: string) => void;
}

const Comment: React.FC<CommentProps> = ({ id, isReply, username, commentText, textAreaRef, setCreateReply, setParentComment, setCommentWriter, profileURL }) => {
  const handleReply = () => {
    if (textAreaRef?.current) {
      textAreaRef.current.focus();
    }
    setCreateReply(true);
    setParentComment(id);
    setCommentWriter(username);
  };
  return (
    <>
      <div className={`${css.bubbleContainer} ${isReply ? css.replyComment : ""}`}>
        <div className={css.imageContainer}>
          <img src={profileURL !== "" ? profileURL : "/assets/blank-profile.png"} alt="" />
        </div>
        <div className={css.bubbleContent}>
          <div className={css.bubbleDescription}>
            <h5>{username}</h5>
            <h4 className={css.commentText}>{commentText}</h4>
          </div>
          <div className={css.bubbleAction} onClick={handleReply}>
            <h6>Reply</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
