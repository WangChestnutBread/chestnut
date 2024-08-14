import { useEffect, useState } from "react";
import PronunciationLeft from "../../molecules/StudyList/PronunciationLeft";
import PronunciationRight from "../../molecules/StudyList/PronunciationRight";
import baseApi from "../../api/fetchAPI";
import { useParams } from "react-router-dom";

const Pronunciations = ({saying, realData, location}) => {

  const params = useParams()
  const [word, setWrod] = useState("")
  const [pronounce, setPronounce] = useState("")

  useEffect(() => {
    baseApi.get(`/study/detail/${saying.studyId}/word`).then((res) => {
      console.log(res);
      setWrod(res.data.data.word);
      setPronounce(res.data.data.pronounce);
    });
  });


  return (
    <div style={{
      height:"100%",
        display:"flex",
        flexDirection:"column",
    }}>
      {/* 1행 */}
      <div 
      style={{
        display:"flex",
        width:"100%",
        height:"50%"
      }}>
        {/* 1행 1열 */}
        <div style={{
          width:"24%",
          backgroundColor:"#DCB78F",
          display:"flex",
          justifyContent:"center"
        }}>
          <PronunciationLeft data={"발음"} />
        </div>
        <div 
          style={{
            width:"76%",
            backgroundColor:"lightgray",
            marginRight:"10px",
            display:"flex",
            justifyContent:"center"
          }}>
        {word ? (
          <PronunciationRight data={word} location={location} />
        ) : (
          <></>
        )}
        </div>
      </div>
      <div 
      style={{ 
        display:"flex",
        width:"100%",
        height:"50%",
        marginTop:"2%",
      }}>
        <div
          style={{
            width:"24%",
            backgroundColor:"#DCB78F",
            display:"flex",
            justifyContent:"center"
          }}>
          <PronunciationLeft data={"내 발음"} />
        </div>
          <div
            style={{
              width:"76%",
              backgroundColor:"lightgray",
              marginRight:"10px",
              display:"flex",
              justifyContent:"center"

            }}>
            {pronounce ? (
            <PronunciationRight data={realData} location={[]}/>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pronunciations;
