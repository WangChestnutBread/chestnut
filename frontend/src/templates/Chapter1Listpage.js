import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ChapterList from "../molecules/StudyList/ChapterList";
import Text24 from "../atoms/Text24";
import useAuthStore from "../stores/authStore";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";
import axios from "axios";
import "./Chapter1Listpage.css";
function Word({ number }) {
  return (
    <span className="chapter1Font">
      <Link
        to={`/study/detail1/${number.studyId}/${number.word}`}
        className="customLink"
      >
        {number.word}
      </Link>
    </span>
  );
}

function Chapter1Listpage({ content }) {
  return (
    <div>
      <div className="chapter1Board">
        <div>
          <ChapterList title={"Ch1. 자음/모음"} content={"r"} />
          <div className="chapter1">
            <div className="chapter1subTitle">자음</div>
            <div>
              {word1.map((number, idx) => (
                <Word number={number} key={idx} />
              ))}
            </div>
            <div className="chapter1subTitle">모음</div>
            <div>
              {word2.map((number, idx) => (
                <Word number={number} key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chapter1Listpage;
