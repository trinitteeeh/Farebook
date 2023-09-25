// ReelPage.tsx
import { useState } from "react";
import css from "./style.module.css";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_ALL_REELS } from "./query";
import Reels from "./components/Reels";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsLoaded, setItemsLoaded] = useState(3);
  const navigate = useNavigate();

  const { data, loading, refetch } = useQuery(GET_ALL_REELS, {
    variables: { limit: itemsLoaded, offset: 0 },
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (!data) return;

  const prevSlide = () => {
    currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(data.getStoryByUserId - 1);
  };

  const nextSlide = () => {
    if (currentIndex === itemsLoaded) {
      setItemsLoaded(itemsLoaded + 3);
      refetch();
    }

    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleCloseReels = () => {
    setCurrentIndex(0);
    setItemsLoaded(3);
    navigate("/");
  };

  const handleCreateReels = () => {
    setCurrentIndex(0);
    setItemsLoaded(3);
    navigate("/reels/create");
  };

  const reels = data.getAllReels;

  return (
    <div className={css.container}>
      <div className={css.icon} style={{ position: "absolute", top: "2vh", left: "1vw" }} onClick={handleCloseReels}>
        <AiOutlineClose style={{ color: "#ffffff" }} />
      </div>
      <div className={css.moveReelBtn} onClick={prevSlide}>
        <FaLessThan />
      </div>
      <Reels reel={reels[currentIndex]} />
      <div className={css.moveReelBtn} onClick={nextSlide}>
        <FaGreaterThan />
      </div>
      <div className={`${css.redirectIcon} ${css.moveReelBtn}`} onClick={handleCreateReels}>
        <IoCreateOutline style={{ color: "#000000", width: 25, height: 25 }} />
      </div>
    </div>
  );
}

export default ReelsPage;
