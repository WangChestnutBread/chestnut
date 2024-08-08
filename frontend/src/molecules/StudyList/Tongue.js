import './Tongue.css'

const Tongue = (tongueData) => {
  // console.log(tongueData);
  return (
    <div className="tongue mb-5">
      <div className="d-flex align-items-center">
        <img src="/icons/Tongue.svg" alt="tongue" className="m-2"/>
        <span>혀모양</span>
      </div>
      <div className="tongue-box">
        <img src={tongueData.tongueData} className="tongue-a" alt="tongue"/>
      </div>
    </div>
  );
};
export default Tongue;
