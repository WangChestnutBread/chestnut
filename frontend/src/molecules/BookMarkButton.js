import { useEffect, useState } from "react";
import "./BookMarkButton.css"
import CustomAlert from "../atoms/alert";

function BookMarkButton() {
  let [initialMount, setInitialMount] = useState(false);
  let [inVoca, setInVoca] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    if (initialMount && inVoca) {
      setAlertContent(`단어장에 추가됐습니다.`);
    } else if (initialMount && !inVoca) {
      setAlertContent(`단어장에서 삭제됐습니다.`);
    }
  }, [inVoca]);

  const handleCloseAlert = () => {
    setAlertContent(null); // Alert 닫기
  };

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
      {alertContent && 
                <CustomAlert content={alertContent} 
                onClose={handleCloseAlert}
            />}
    </div>
  );
}

export default BookMarkButton;
