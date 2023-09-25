import css from "./style.module.css";

interface StoryProps {
  story: Story;
  isActive: boolean;
}

const Story: React.FC<StoryProps> = ({ story, isActive }) => {
  const divStyle = story.pictureURL !== "" ? { backgroundImage: `url(${story.pictureURL})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : JSON.parse(story.backgroundStyle);

  return (
    <>
      <div className={`${css.story} ${isActive ? css.storyActive : ""}`} style={divStyle}>
        <div className={css.storyText} style={{ fontFamily: story.fontType }}>
          {story.text}
        </div>
      </div>
    </>
  );
};

export default Story;
