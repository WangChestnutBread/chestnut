import "./PronunciationRight.css";
import Text64 from "../../atoms/Text64";

const Ch5PronunciationRight = ({ data, location, onCharacterClick }) => {
  return (
    <div
      className="right d-flex justify-content-center align-items-center text-center rounded-end"
      style={{
        wordBreak: "break-word",     
        whiteSpace: "pre-wrap",      
        maxWidth: "100%",             
        overflowWrap: "break-word",   
        display: "flex",
        flexWrap: "wrap",             
      }}
    >
      {data.split("").map((char, index) => (
        <span
          key={index}
          style={{
            color: location.includes(index) ? "red" : "black",
            cursor: "pointer",
            fontSize: "1.5rem",
            whiteSpace: "pre",
            display: "inline-block",
          }}
          onClick={() => onCharacterClick(char)}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Ch5PronunciationRight;
