import "./Chapter3List.css";
import ChapterList from "../../molecules/ChapterList/ChapterList";
import Text32 from "../../atoms/Text32";
import { useNavigate } from "react-router-dom";

function Chapter3List({content, chapterId}) {
  console.log(content[0])
  let navigate = useNavigate();
  return (
    <div className="Chapter3List">
      <div className="Chapter3Content">
        
        {/* 칠판 왼쪽 */}
        <div className="Ch3ContentLeft">
          <div className="Chapter3Title">
            <Text32 text={content[0].categoryContent} />
          </div>
          {
            content[0].child.map((itemchild) => {
              return (
                <div className="Ch3ContentWord" 
                style={itemchild.isPass ? { color: "#74A6FD" } : itemchild.isStudy ? { color: "#CECECE" } : null}
                onClick={()=>{
                  navigate(
                    `/study/detail${chapterId}/${chapterId}/${itemchild.studyId}`
                  );
                }}>
                  <Text32 text={itemchild.word} />
                </div>
              );
            })
          }        
        </div>

        {/* 칠판 오른쪽 */}
        <div className="Ch3ContentRight">
          <div className="WordLastRule">
            <Text32 text={"- 음절의 끝소리 규칙 -"} />
          </div>

          <div className="WordLastRuleContent">
            <Text32 text={"음절의 끝소리 자리에 \n ‘ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ’ \n 일곱 소리 이외의 자음이 오면 \n 이 일곱 자음 가운데 하나의 소리로 바뀌는 규칙"}/>
          </div>

          <div className="WordLastRuleEx">
            <Text32 text={"예) 낮[낟], 부엌[부엌]"}/>
          </div>
        </div>
          
          

      </div>

      {/* 칠판 가운데 점선 */}
      <div className="Ch3VerticalLine"></div>

      {/* 칠판 */}
      <ChapterList title={"Ch3. 받침글자"} />
    </div>        
  );
}
export default Chapter3List;
