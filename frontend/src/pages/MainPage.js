import MainTemplate from "../templates/MainTemplate";
import "./MainPage.css";
import useAuthStore from "../stores/authStore";
import baseApi from "../api/fetchAPI";
function MainPage() {
  const { accessToken, setAccessToken } = useAuthStore((state) => ({
    ...state,
  }));
  const reissueToken = () => {
    baseApi.post('/member/reissue')
  };
  return (
    <div className="MainPage">
      <button onClick={reissueToken}>토큰 재발급 테스트</button>
      <MainTemplate />
    </div>
  );
}

export default MainPage;
