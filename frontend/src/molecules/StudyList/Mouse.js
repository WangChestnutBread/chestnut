const Mouse = (mouthData) => {

  return (
    <div className="mouse mb-5">
      <div className="d-flex align-items-center">
        <img src="/icons/Mouse.svg" alt="mouse" className="m-2" />{" "}
        <span>입모양</span>
      </div>
      <div>
        <img src={mouthData.mouthData} alt="mouse" />
      </div>
    </div>
  );
};
export default Mouse;
