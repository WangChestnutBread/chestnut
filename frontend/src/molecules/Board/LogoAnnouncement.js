const LogoAnnouncement = () => {
  return (
    <div className="logo-container">
      <div className="position-relative">
        <img src="/image/Logo.png" alt="밤빵" className="logo" style={{"width":"260px", "height":"110px"}} />
        <span className="qna position-absolute bottom-0 start-100">게시판</span>
      </div>
    </div>
  );
};
export default LogoAnnouncement;
