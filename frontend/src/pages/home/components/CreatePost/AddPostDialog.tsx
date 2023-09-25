import React, { useCallback, useContext, useEffect, useState } from "react";
import css from "./style.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { BsEmojiSmile, BsFileImage } from "react-icons/bs";
import { FaUserTag } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import Axios from "axios";
import getDateInString from "../../../../common/utils/CurrentDateCreator";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST, CREATE_POST_PICTURE } from "../../mutation";
import VideoThumbnail from "react-video-thumbnail";
import { GrClose } from "react-icons/gr";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HiMiniGif } from "react-icons/hi2";
import { GET_ALL_FRIENDS } from "../../../stories/query";
import "quill-mention";
import LoadingPage from "../../../loading";

interface AddPostDialogProps {
  onClose: () => void;
  dialogVisible: boolean;
  refetchData: () => void;
  setLoading: (loadingState: boolean) => void;
  user: User;
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({ onClose, dialogVisible, refetchData, setLoading, user }) => {
  const options = ["Friends", "Public"];
  const [postText, setPostText] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [pictures, setPictures] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [createPost] = useMutation(CREATE_POST);
  const [createPostPicture] = useMutation(CREATE_POST_PICTURE);

  const { data: friendsData, loading: friendsLoading } = useQuery(GET_ALL_FRIENDS, {
    variables: { userID: user ? user.id : "" },
    skip: !user,
  });

  const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSelectImage = (files: FileList | null) => {
    if (files) {
      const selectedImages = Array.from(files);
      const totalMediaCount = pictures.length + selectedImages.length;

      if (totalMediaCount > 0 && totalMediaCount <= 10) {
        setPictures([...pictures, ...selectedImages]);
        setError(""); // Clear any previous error
      } else if (totalMediaCount > 10) {
        setError("Maximum 10 media in total");
      }
    }
  };

  const handleSubmitPost = async () => {
    onClose();
    const newPost = {
      userId: user?.id,
      postText: postText,
      privacy: privacy,
      publishDate: getDateInString(),
    };

    setLoading(true);

    try {
      const { data } = await createPost({
        variables: {
          newPost: newPost,
        },
      });

      console.log("data");
      console.log(data);

      const createdPost = data.createPost;

      let mediaUrls: string[] = []
      if (pictures.length > 0) {
        try {
          await Promise.all(
            pictures.map(async (media) => {
              const formData = new FormData();
              formData.append("file", media);
              formData.append("upload_preset", "pdrrobxc");

              const endpoint = media.type.startsWith("image/") ? "image" : "video";
              await Axios.post(`https://api.cloudinary.com/v1_1/dmqhud5tb/${endpoint}/upload`, formData).then(async (response) => {
                const mediaURL = response.data.secure_url;
                console.log("post id: " + createdPost.id);
                console.log("media: " + mediaURL);
                console.log("response");
                console.log(response);
                mediaUrls.push(mediaURL)
              });
            })
          );
          console.log("COBA", createdPost.id, mediaUrls)
          console.log("Media uploaded successfully");
        } catch (uploadError) {
          console.error("Error uploading media:", uploadError);
        }
      }
      try{
        await createPostPicture({
          variables: {
            postID: createdPost.id,
            pictureURL: mediaUrls
          }
        })
      }catch(err){
        console.log(err);
      }

      setLoading(false);
      refetchData();
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  const mentionSource = useCallback(
    async (searchTerm, renderList) => {
      try {
        if (!friendsLoading && friendsData?.getAllFriends) {
          const matchedFriends = friendsData.getAllFriends.filter((friend: User) => `${friend.firstName} ${friend.surename}`.toLowerCase().includes(searchTerm.toLowerCase()));
          renderList(
            matchedFriends.map((friend: User) => ({
              value: `${friend.firstName} ${friend.surename}`,
              id: friend.id,
            }))
          );
        }
      } catch (error) {
        console.error("An error occurred in mentionSource:", error);
      }
    },
    [friendsData, friendsLoading]
  );

  if (friendsLoading) {
    return <LoadingPage />;
  }

  const modules = {
    toolbar: [["link"], ["mention"], ["bold", "italic", "underline", "strike"], ["clean"]],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      source: mentionSource,
    },
  };

  return (
    <div className={`${css.dialogOverlay} ${dialogVisible ? css.active : ""}`} onClick={onClose}>
      <div className={css.dialogContent} onClick={handleDialogClick}>
        <div className={css.closeBtn}>
          <AiFillCloseCircle className={css.closeIcon} onClick={onClose} />
        </div>
        <div className={css.dialogTitle}>Create Post</div>
        <div className={css.profileContainer}>
          <div style={{ width: "3rem", height: "3rem" }}>
            <img src={user?.profileURL !== "" ? user?.profileURL : "/assets/profile-blank.png"} alt="" className={css.profilePicture} />
          </div>

          <div className={css.profileDetail}>
            <h4 className={css.profileName}>{user?.firstName + " " + user?.surename}</h4>
            <select onChange={(event) => setPrivacy(event.target.value)}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={css.postContainer}>
          <ReactQuill value={postText} onChange={setPostText} theme="snow" placeholder={`What do you think ${user?.firstName}?`} modules={modules} />
          {pictures.length > 0 && (
            <div className={css.mediaPreviewContainer}>
              <div className={css.closeImageIcon} onClick={() => setPictures([])}>
                <GrClose style={{ cursor: "pointer" }} />
              </div>
              {pictures.map((media, index) => (
                <div className={css.mediaPreview} key={index}>
                  {media.type.startsWith("image/") ? <img src={URL.createObjectURL(media)} alt="" /> : <VideoThumbnail videoUrl={URL.createObjectURL(media)} />}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={css.optionContainer}>
          <h5 className={css.optionTitle}>Add to your post</h5>
          <div className={css.optionIconContainer}>
            <div className={css.optionIcon}>
              <label htmlFor="fileInput" className={css.optionLabel}>
                <BsFileImage color="#44bd63" />
              </label>
              <input
                type="file"
                id="fileInput"
                className={css.inputHidden}
                multiple
                onChange={(e) => {
                  handleSelectImage(e.target.files);
                }}
              />
            </div>
            <FaUserTag className={css.optionIcon} color="#4077f2" />
            <BsEmojiSmile className={css.optionIcon} color="#f6ba27" />
            <IoLocation className={css.optionIcon} color="#f3543d" />
            <HiMiniGif className={css.optionIcon} color="#3fbaa7" />
            <FiMoreHorizontal className={css.optionIcon} color="#626a72" />
          </div>
        </div>
        {error !== "" && <h5 style={{ color: "red" }}>{error}</h5>}
        <div className={css.actionContainer}>
          {postText !== "" ? (
            <button className={css.submitBtn} onClick={handleSubmitPost}>
              Post
            </button>
          ) : (
            <button className={css.submitBtn} style={{ backgroundColor: "#e4e6ea", color: "#bcc0c5" }}>
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPostDialog;
