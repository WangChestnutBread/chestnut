import axios from "axios";
import MainTemplate from "../templates/MainTemplate";
import "./MainPage.css";
import useAuthStore from "../stores/authStore";
function MainPage() {
  const { accessToken, setAccessToken } = useAuthStore((state) => ({
    ...state,
  }));
  const reissueToken = () => {
    axios({
      url: "https://i11d107.p.ssafy.io/chestnutApi/member/reissue",
      method: "post",
      withCredentials: true,
    });
  };
  return (
    <div className="MainPage">
      {/* <button onClick={reissueToken}>토큰 재발급 테스트</button> */}
      <MainTemplate />
    </div>
  );
}

export default MainPage;
