import { useState } from "react";
import DropItem from "../molecules/DropItem";
import "./ChestNutButton.css";

function ChestNutButton() {
  let [showMenu, setShowMenu] = useState(false);
  return (
    <div className="ChestNutButton">
      <img
        src="/icons/ChestNut.svg"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      />
      {showMenu ? <DropMenu /> : null}
    </div>
  );
}

function DropMenu() {
  let [itemList, setitemList] = useState([
    { img: "/icons/LastStudyButton.svg", path: "", menu: "메인 화면" },
    { img: "/icons/LastStudyButton.svg", path: "", menu: "학습 목록" },
    { img: "/icons/LastStudyButton.svg", path: "", menu: "대화 연습" },
    { img: "/icons/LastStudyButton.svg", path: "", menu: "단어장" },
    { img: "/icons/LastStudyButton.svg", path: "", menu: "게시판" },
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
