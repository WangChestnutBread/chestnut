const Tongue = (tongueData) => {
  // console.log(tongueData);
  return (
    <div className="tongue">
      <div className="d-flex align-items-center">
        <img src="/icons/Tongue.svg" alt="tongue" className="m-2"/>
        <span>혀모양</span>
      </div>
      <div>
        <img src={tongueData.tongueData} alt="tongue" style={{marginBottom:63}}/>
      </div>
    </div>
  );
};
export default Tongue;
