// import React from "react";
// import { useParams } from "react-router-dom";
// import Chapter1List from "../../templates/Chapter1List";
// import Chapter2Listpage from "../../templates/Chapter2Listpage";
// import Chapter3Listpage from "../../templates/Chapter3Listpage";
// import Chapter5Listpage from "../../templates/Chapter5Listpage";
// import Chapter6Listpage from "../../templates/Chapter6Listpage";

// function ChapterListpage() {
//   const { listId } = useParams();
//   console.log(listId);
//   let content;
//   if (listId == 1) {
//     content = <Chapter1List />;
//   } else if (listId == 2) {
//     content = <Chapter2Listpage />;
//   } else if (listId == 3) {
//     content = <Chapter3Listpage />;
//   } else if (listId==5){
//     content = <Chapter5Listpage />;
//   } else if (listId==6){
//     content = <Chapter6Listpage />;
//   } else {
//     content = <div>Invalid studyId</div>;
//   }
//   return <div>{content}</div>;
// }

// export default ChapterListpage;
