import React from "react";
function ChapterTitle(props){
  return(
    <div className="container">
        <div style={{ paddingTop: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 10, display: 'flex'}}>
          <div style={{justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div style={{textAlign: 'center', color: '#412522', fontSize: 32, fontFamily: 'Jua', fontWeight: '400',wordWrap: 'break-word'}}>{props.title}</div>
          </div>
      </div>
    </div>
    
  ); 
}
export default ChapterTitle;