function ChapterTitle(props) {
  return (
    <div style={{display: "inline-block",
      position: "absolute",
      top: "0%",
      right: "0%"}}>
      <div>{props.title}</div>
    </div>
  );
}
export default ChapterTitle;
