import { useEffect, useState } from "react";
import "./BookMarkButton.css"

function BookMarkButton() {
  let [initialMount, setInitialMount] = useState(false);
  let [inVoca, setInVoca] = useState(false);
  useEffect(() => {
    if (initialMount && inVoca) {
      window.alert("단어장에 추가됐습니다");
    } else if (initialMount && !inVoca) {
      window.alert("단어장에서 삭제됐습니다");
    }
  }, [inVoca]);

  return (
    <div className="BookMarkButton"
      onClick={() => {
        setInitialMount(true);
        setInVoca(!inVoca);
      }}
    >
      {inVoca ? (
        <img src="/icons/BookMark.svg" height="100%"/>
      ) : (
        <img src="/icons/EmptyBookMark.svg" height="100%"/>
      )}
    </div>
  );
}

export default BookMarkButton;
