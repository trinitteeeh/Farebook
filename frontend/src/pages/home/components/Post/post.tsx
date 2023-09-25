import css from "./style.module.css";
import { AiFillLike, AiOutlineClose, AiOutlineLike, AiOutlineMore } from "react-icons/ai";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BiComment } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { FcLike } from "react-icons/Fc";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT_REPLY, CREATE_POST_COMMENT, CREATE_POST_LIKE, DELETE_POST, DELETE_POST_LIKE } from "../../mutation";
import { GET_LIKES_COUNT } from "../../query";
import CommentContainer from "./components/CommentsContainer";
import LoadingPage from "../../../loading";

interface PostProps {
  id: string;
  profileName: string;
  profileLocation: string;
  text: string;
  images: string[];
  likes: number;
  isLiked: boolean;
  profileURL: string;
  user: User | null;
  profileID: string;
  refetchPost: () => void;
}

const Post: React.FC<PostProps> = ({ id, profileName, profileLocation, text, images, likes, isLiked, profileURL, user, profileID, refetchPost }) => {
  const [liked, setLiked] = useState(isLiked);
  const [dialogActive, setDialogActive] = useState(false);
  const [parentComment, setParentComment] = useState("");
  const [commentText, setComentText] = useState("");
  const [refetchComment, setRefetchComment] = useState(false);
  const [isHover, setIshover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [createReply, setCreateReply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentWriter, setCommentWriter] = useState("");
  const textareaRef = useRef(null);

  const [createPostLike] = useMutation(CREATE_POST_LIKE);
  const [deletePostLike] = useMutation(DELETE_POST_LIKE);
  const [CreatePostCommentReply] = useMutation(CREATE_COMMENT_REPLY);
  const [createPostComment] = useMutation(CREATE_POST_COMMENT);
  const [deletePost] = useMutation(DELETE_POST);

  const { data, loading, refetch } = useQuery(GET_LIKES_COUNT, { variables: { postId: id } });

  if (loading) return <p>loading</p>;

  const handleLike = async () => {
    if (liked) {
      try {
        await deletePostLike({
          variables: {
            postID: id,
            userID: user?.id ? user.id : "",
          },
        });
      } catch (error) {
        console.error("Error liking post:", error);
      }
    } else {
      try {
        await createPostLike({
          variables: {
            postID: id,
            userID: user?.id ? user.id : "",
          },
        });
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
    refetch();
    setLiked(!liked);
  };

  const handleShowComment = async () => {
    setDialogActive(true);
  };

  const handleSubmitComment = async () => {
    if (createReply) {
      try {
        await CreatePostCommentReply({
          variables: {
            postID: id,
            userID: user?.id ? user.id : "",
            commentText: commentText,
            parentID: parentComment,
          },
        });
        setCreateReply(false);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        await createPostComment({
          variables: {
            postID: id,
            userID: user?.id ? user.id : "",
            commentText: commentText,
          },
        });
      } catch (error) {
        console.error("Error making comments: ", error);
      }
    }
    setComentText("");
    setRefetchComment(true);
  };
  const handleDeletePost = async () => {
    console.log(id);
    try {
      setIsLoading(true);
      await deletePost({
        variables: {
          id: id,
        },
      }).then(() => {
        refetchPost();
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error delete error: ", error);
      setIsLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (isLoading) return <LoadingPage />;

  likes = data?.getLikesCount || likes;

  return (
    <>
      <div className={`${css.postOverlay} ${dialogActive ? css.active : ""}`} onClick={() => setDialogActive(false)}>
        <div className={`${css.postContainer} ${dialogActive ? css.containerActive : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className={css.postHeader}>
            <div className={css.headerLeft}>
              <div className={css.imageContainer}>
                <img src={profileURL !== "" ? profileURL : "/assets/blank-profile.png"} alt="" />
              </div>
              <div className={css.profileInfo}>
                <h3 style={{ cursor: "pointer" }} className={css.profileName} onMouseEnter={() => setIshover(true)} onMouseLeave={() => setIshover(false)}>
                  {profileName}
                </h3>
                <h5 className={css.profileLocation}>{profileLocation}</h5>
                <div className={`${css.profileAdditionalInfo} ${isHover ? css.additionalActive : ""}`}>
                  <div className={css.profileAdditionalTop}>
                    <div className={css.imageContainer} style={{ width: "5rem", height: "5rem" }}>
                      <img src={profileURL !== "" ? profileURL : "/assets/blank-profile.png"} alt="" />
                    </div>
                    <div className={css.profileInfo}>
                      <h2>{profileName}</h2>
                      <h5 className={css.profileLocation}>{profileLocation}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.headerRight}>
              <div className={css.moreIcon} onClick={() => setIsClicked(!isClicked)}>
                <AiOutlineMore />
              </div>
              <div className={`${css.morePopup} ${isClicked ? css.moreActive : ""}`}>{profileID === user?.id && <div onClick={handleDeletePost}>Delete Post</div>}</div>
            </div>
          </div>
          <div className={css.contentContainer}>
            <div className={css.textContainer}>
              <p className={css.text}>{text}</p>
            </div>
            <div className={css.mediaContainer}>
              {images.map((imageUrl, index) => (
                <div className={css.media} key={index}>
                  <img className={css.media} src={imageUrl} alt="" />
                </div>
              ))}
            </div>
            <div className={css.pictureAction}>
              <div className={css.actionDesctiption}>
                <div className={css.description}>
                  <FcLike />
                  <h4>{likes} Likes</h4>
                </div>
                <div className={css.description}>
                  <h4>Comments</h4>
                </div>
                <div className={css.description}>
                  <h4>Share</h4>
                </div>
              </div>
              <div className={css.actionContainer}>
                <div className={css.action} onClick={handleLike}>
                  {liked === false ? <AiOutlineLike className={css.actionIcon} /> : <AiFillLike className={css.actionIcon} color="#3d6de9" />}
                  <h4>Like</h4>
                </div>
                <div
                  className={css.action}
                  onClick={() => {
                    handleShowComment();
                  }}
                >
                  <BiComment className={css.actionIcon} />
                  <h4>Comment</h4>
                </div>
                <div className={css.action}>
                  <PiShareFatBold className={css.actionIcon} />
                  <h4>Share</h4>
                </div>
              </div>
            </div>
            {dialogActive ? (
              <CommentContainer
                active={dialogActive}
                isRefetch={refetchComment}
                setIsRefetch={setRefetchComment}
                postID={id}
                textAreaRef={textareaRef}
                setCreateReply={setCreateReply}
                setParentComment={setParentComment}
                setCommentWriter={setCommentWriter}
              />
            ) : null}
          </div>
          <div className={`${css.createCommentContainer} ${dialogActive ? css.commentActive : ""}`}>
            {createReply && (
              <div className={css.createStatusContainer}>
                <h4>Replying to {commentWriter}</h4>
                <div className={css.closeReplyBtn} onClick={() => setCreateReply(false)}>
                  <AiOutlineClose />
                </div>
              </div>
            )}

            <div className={css.commentActionContainer}>
              <div className={css.imageContainer}>
                <img src={user?.profileURL !== "" ? user?.profileURL : "/assets/blank-profile.png"} alt="" />
              </div>
              <textarea ref={textareaRef} className={css.commentTextArea} placeholder="Your comments ..." value={commentText} onChange={(e) => setComentText(e.target.value)}></textarea>
              <div className={css.sendBtn} onClick={handleSubmitComment}>
                {" "}
                <RiSendPlane2Fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
