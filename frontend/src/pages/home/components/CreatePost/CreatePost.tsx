import css from "./style.module.css";
import { FcGallery, FcLike, FcVideoCall } from "react-icons/Fc";
import AddPostDialog from "./AddPostDialog";
import { useState } from "react";

interface CreatePostProps {
  refetchData: () => void;
  setLoad: (loadingState: boolean) => void;
  user: User;
}

export default function CreatePost(props: CreatePostProps) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleShowDialog = () => {
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
  };
  return (
    <>
      {dialogVisible && <AddPostDialog onClose={handleCloseDialog} dialogVisible={dialogVisible} refetchData={props.refetchData} setLoading={props.setLoad} user={props.user} />}
      <div className={css.container}>
        <div className={css.topPart}>
          <div className={css.imageContainer}>
            <img src={props.user?.profileURL !== "" ? props.user?.profileURL : "/assets/blank-profile.png"} alt="" />
          </div>
          <div className={css.popUpBtn} onClick={handleShowDialog}>
            What's on your mind Trin?
          </div>
        </div>
        <div className={css.bottomPart}>
          <div className={css.featureContainer}>
            <FcVideoCall />
            <h5>Live Video</h5>
          </div>
          <div className={css.featureContainer}>
            <FcGallery />
            <h5>Photo</h5>
          </div>
          <div className={css.featureContainer}>
            <FcLike />
            <h5>Feeling</h5>
          </div>
        </div>
      </div>
    </>
  );
}
