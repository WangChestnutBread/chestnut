import { useState } from "react";
import DropItem from "../molecules/DropItem";
import "./ChestNutButton.css";

function ChestNutButton() {
  let [showMenu, setShowMenu] = useState(false);

  return (
    <div className="ChestNutButton">
      <img
        src="/icons/ChestNut.svg"
        width="100%"
        height="100%"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      />
      {showMenu && <DropMenu />}
    </div>
  );
}

function DropMenu() {
  let [itemList, setitemList] = useState([
    { img: "/image/Squirrel.png", path: "/main", menu: "메인 화면" },
    { img: "/image/List.png", path: "/study", menu: "학습 목록" },
    { img: "/image/AITalk.png", path: "", menu: "대화 연습" },
    { img: "/image/Board.png", path: "", menu: "단어장" },
    { img: "/image/BookMarkImage.png", path: "/board/qna/1", menu: "게시판" },
  ]);
  return (
    <div className="DropMenu">
      {itemList.map((item) => {
        return <DropItem img={item.img} path={item.path} menu={item.menu} />;
      })}
    </div>
  );
}
export default ChestNutButton;
