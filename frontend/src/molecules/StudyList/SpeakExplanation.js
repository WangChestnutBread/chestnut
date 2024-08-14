import "./SpeakExplanation.css";

const SpeakExplanation = ({ data }) => {
  console.log(data);
  console.log('sadfa');
  return (
    <div>
      {data.map((saying, index) => (
        <div className="d-flex align-items-center m-2">
          <div
            key={index}
            className="leaf-container d-flex"
            style={{width:"60px"}}
          >   
            <img src="/image/Leaf.png" alt="잎" className="leaf-image" style={{width:"100%"}}/>
            <span className="leaf-text">{saying.word}</span>
          </div>
          <div className="m-2">
          <p style={{ color: "white",fontSize:"1.2rem",lineHeight:"150%" }} className="m-2">{saying.pronounceMethod}</p>
          </div>
        </div>
      ))}
      </div>
  )
}

export default SpeakExplanation;
