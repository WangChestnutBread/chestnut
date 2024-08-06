import MainTemplate from "../templates/MainTemplate";
import "./MainPage.css";
import useAuthStore from "../stores/authStore";
import baseApi from "../api/fetchAPI";
import axios from "axios";
function MainPage() {
  const { accessToken, setAccessToken } = useAuthStore((state) => ({
    ...state,
  }));
  const reissueToken = () => {
    // axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/reissue",{})
    // .then((res) => console.log(res))
    baseApi.post('/member/reissue').then((res) => {
      console.log(res);
    })
  };

  return (
    <div className="MainPage">
      <button onClick={reissueToken}>토큰 재발급 테스트</button>
      <MainTemplate />
    </div>
  );
}

export default MainPage;
