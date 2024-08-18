import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropItem from "../../molecules/Navbar/DropItem";
import "./ChestNutButton.css";

function ChestNutButton() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth <= 910) {
    return <HamburgerMenu />;
  } else {
    return (
      <nav className="navbar">
        <Link to="/main" className="nav-item">
          <img src="/image/Logo.png" alt="양방빵 로고" />
        </Link>
        <div className="nav-menu">
          <Link to="/study" className="nav-item">
            학습 목록
          </Link>
          <Link to="/ai" className="nav-item">
            대화 연습
          </Link>
          <Link to="/myVocabulary" className="nav-item">
            단어장
          </Link>
          <Link to="/board/announcement/1" className="nav-item">
            게시판
          </Link>
        </div>
      </nav>
    );
  }
}

function HamburgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  return (
    <div className="hamburger-menu">
      <img src="/icons/ChestNut.svg" alt="Menu" onClick={toggleMenu} />
      {showMenu && <DropMenu />}
    </div>
  );
}

function DropMenu() {
  let [itemList] = useState([
    { img: "/image/Squirrel.png", path: "/main", menu: "메인 화면" },
    { img: "/image/List.png", path: "/study", menu: "학습 목록" },
    { img: "/image/AITalk.png", path: "/ai", menu: "대화 연습" },
    { img: "/image/Board.png", path: "/myVocabulary", menu: "단어장" },
    {
      img: "/image/BookMarkImage.png",
      path: "/board/announcement/1",
      menu: "게시판",
    },
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
