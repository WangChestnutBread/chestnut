import "./PronunciationRight.css";
import Text64 from "../../atoms/Text64";

const Ch5PronunciationRight = ({data, location, onCharacterClick}) => {
  return (
    <div className="right d-flex justify-content-center align-items-center text-center rounded-end">
      {data.split('').map((char, index) => (
        <span 
          key={index}
          style={{ color: location.includes(index) ? 'red' : 'black', cursor: 'pointer' }}
          onClick={() => onCharacterClick(char)}  // 클릭 시 선택된 글자 전달
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Ch5PronunciationRight;