import { useQuery } from "@apollo/client";
import CommentBubble from "./CommentBubble";
import css from "./style.module.css";
import { GET_POST_COMMENTS } from "../../../query";
import React, { useEffect } from "react";

interface CommentContainerProps {
  active: boolean;
  isRefetch: boolean;
  setIsRefetch: (stat: boolean) => void;
  postID: string;
  textAreaRef: React.RefObject<HTMLInputElement>;
  setCreateReply: (reply: boolean) => void;
  setParentComment: (parentID: string) => void;
  setCommentWriter: (parentID: string) => void;
}

interface CommentType {
  id: string;
  postID: string;
  userID: string;
  commentText: string;
  user: User;
  replies: [CommentReplyType];
}

interface CommentReplyType {
  id: string;
  postID: string;
  userID: string;
  commentText: string;
  user: User;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ active, isRefetch, setIsRefetch, postID, textAreaRef, setCreateReply, setParentComment, setCommentWriter }) => {
  const { data, loading, refetch, error } = useQuery(GET_POST_COMMENTS, { variables: { postID: postID } });

  useEffect(() => {
    if (isRefetch) {
      refetch();
    }
    setIsRefetch(false);
  }, [isRefetch, refetch, setIsRefetch]);

  if (loading) return <p>loading</p>;
  if (error) return <p>Errornya: {error.message}</p>;
  return (
    <>
      <div className={`${css.commentsContainer} ${active ? css.active : ""}`}>
        {data.getPostComments.map((comment: CommentType) => (
          <React.Fragment key={comment.id}>
            <CommentBubble
              id={comment.id}
              commentText={comment.commentText}
              username={comment.user.firstName + " " + comment.user.surename}
              isReply={false}
              textAreaRef={textAreaRef}
              setCreateReply={setCreateReply}
              setParentComment={setParentComment}
              setCommentWriter={setCommentWriter}
              profileURL={comment.user.profileURL ? comment.user.profileURL : ""}
            />
            {comment.replies.map((reply) => (
              <CommentBubble
                id={reply.id}
                key={reply.id}
                commentText={reply.commentText}
                username={reply.user.firstName + " " + reply.user.surename}
                isReply={true}
                textAreaRef={textAreaRef}
                setCreateReply={setCreateReply}
                setParentComment={setParentComment}
                setCommentWriter={setCommentWriter}
                profileURL={reply.user.profileURL ? reply.user.profileURL : ""}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default CommentContainer;
