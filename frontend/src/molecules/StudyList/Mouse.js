import './Mouse.css'

const Mouse = (mouthData) => {

  return (
    <div className="mouse">
      <div className="d-flex align-items-center">
        <img src="/icons/Mouse.svg" alt="mouse" className="m-2" />
        <span>입모양</span>
      </div>
      <div className="mouth-box mx-auto" >
        <img src={mouthData.mouthData} alt="mouth" className="mouth"  />
      </div>
    </div>
  );
};
export default Mouse;
