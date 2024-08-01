import { useState } from "react"
import PronunciationLeft from "../../molecules/StudyList/PronunciationLeft"
import PronunciationRight from "../../molecules/StudyList/PronunciationRight"

const Pronunciations = () => {
  const [data, setData] = useState("갸")
  const mokData1 = {
    data: "[가]",
    }
  const mokData2 = {
    data: data
  }

  return (
    <div>
      <div className="d-flex">
        <div><PronunciationLeft data={"발음"} /></div>
        <div><PronunciationRight data={mokData1} /></div>
      </div>
      <div className="d-flex" style={{marginTop:30}}>
        <div><PronunciationLeft data={"내 발음"} /></div>
        <div><PronunciationRight data={mokData2} /></div>
      </div>
    </div>
  )
}

export default Pronunciations