import { useEffect, useState } from "react";
import Ch5PronunciationLeft from "../../molecules/StudyList/Ch5PronunciationLeft";
import Ch5PronunciationRight from "../../molecules/StudyList/Ch5PronunciationRight";
import baseApi from "../../api/fetchAPI";

const Ch5Pronunciation = ({saying, realData, location, onCharacterClick, handleIsVocabulary}) => {

  const [word, setWrod] = useState("")
  const [pronounce, setPronounce] = useState("")
  // const [result, setResult] = useState("")
  

  useEffect(() => {
    baseApi.get(`/study/detail/${saying.studyId}/word`).then((res) => {
      console.log(res.data.data);

      setWrod(res.data.data.word);
      // setResult(res.data.data.word)
      setPronounce(res.data.data.pronounce);
      // console.log('5단원', res.data.data.isVocabulary);
      handleIsVocabulary(res.data.data.isVocabulary);
    });
  },[saying]);


  return (
    <div 
      style={{
        height:"100%",
        display:"flex",
        flexDirection:"column",        
    }}>
      <div 
        style={{
          display:"flex",
          width:"100%",
          height:"50%",
      }}>
        <div 
          style={{
            width:"24%",
            backgroundColor:"#DCB78F"
        }}>
          <Ch5PronunciationLeft data={"발음"} />
        </div>
        <div 
          style={{
            width:"76%",
        }}>
          {word ? (
            <Ch5PronunciationRight 
              key={word} 
              data={word} 
              location={location} 
              onCharacterClick={onCharacterClick} 
            />
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
            backgroundColor:"#DCB78F"
        }}>
          <Ch5PronunciationLeft data={"발음 결과"} />
        </div>
        <div 
          style={{
            width:"76%",
        }}>
          {pronounce ? (
            <Ch5PronunciationRight 
              key={pronounce} 
              data={realData} 
              location={[]} 
              onCharacterClick={onCharacterClick}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
  
    /////////// 변경 전 코드임 /////////////////
    // <div className="">
    //   <div className="d-flex">
    //     <div className="">
    //       <Ch5PronunciationLeft data={"발음"} />
    //     </div>
    //     {word ? (
    //       <div>
    //         <Ch5PronunciationRight data={word} location={location} onCharacterClick={onCharacterClick} />
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    //   <div className="d-flex" style={{ marginTop: 30 }}>
    //     <div>
    //       <Ch5PronunciationLeft data={"내 발음"} />
    //     </div>
    //     {pronounce ? (
    //       <div>
    //         <Ch5PronunciationRight data={realData} location={[]} onCharacterClick={onCharacterClick}/>
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    // </div>
  
};

export default Ch5Pronunciation;
