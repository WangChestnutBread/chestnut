import React, {useEffect, useState, useCallback} from 'react';
import './Ranking.css';
import $ from 'jquery';
import baseApi from '../api/fetchAPI';
import StudyBackButton from '../molecules/StudyBackButton';
import ChestNutButton from '../organisms/ChestNutButton';
import QuestionMarkButton from '../molecules/QuestionMarkButton';

const Ranking = () => {
    //변수 선언
    const [data, setData] = useState(null);

    const logo = '/image/rankingLogo.png';
    const userImage = '/image/User.png';
    const calendarImage = '/image/calender.png';
    const ratImage = '/image/rats.png';
    const chestnut = '/image/smallchestnut.png';


    useEffect(() => {
        //컴포넌트가 마운트 될 때 실행되는 함수들
        baseApi.get('/ranking-list')
        .then(response => {
            console.log(response.data.data)
            setData(response.data.data);
        })
        .catch(error => {
            console.log("에러 발생", error);
        });

        return () => {
            //컴포넌트가 언마운트되거나 다음 효과 실행 전 정리 작업
        }
    }, []);

    //일반 함수 선언
    const convertToDate = (joinAt) => {
        let year = joinAt[0];
        let month = joinAt[1] > 9 ? joinAt[1] : "0"+joinAt[1];
        let day = joinAt[2] > 9 ? joinAt[2] : "0"+joinAt[2];
        return year+"."+month+"."+day;
    }

    const convertToImgPath = (path) => {
        return 'https://i11d107.p.ssafy.io' + path;
    }

    return (
        <div>
            {/* navbar */}
            <div className="NavbarExample">
                <div className="NavbarButton">
                    <div className="LeftButton">
                        <StudyBackButton/>
                        <ChestNutButton/>
                    </div>
                    <div className="RightButton">
                        <QuestionMarkButton/>
                    </div>
                </div>
            </div>
            <div className='ranking-container'>
                {/* 로고 */}
                <div className='ranking-logo'>
                    <img src={logo} className='ranking-logo-image'/>
                </div>
                {/* 표 */}
                <div className='ranking-table-container'>
                    <table className='ranking-table'>
                        <thead className='ranking-thead'>
                            <tr>
                                <td>순위</td>
                                <td>
                                    <img src={userImage} style={{width:15, height:15, marginRight: 4}}/>
                                    유저
                                </td>
                                <td>
                                    <img src={calendarImage} style={{width:15, height:15, marginRight: 4}}/>
                                    가입일자
                                </td>
                                <td>
                                    <img src={ratImage} style={{width:15, height:15, marginRight: 4}}/>
                                    캐릭터
                                </td>
                                <td>
                                    <img src={chestnut} style={{width:15, height:15, marginRight: 4}}/>
                                    밤송이
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {data&&data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index} className='ranking-table-row'>
                                        <td>{item.rank}</td>
                                        <td>{item.nickname}</td>
                                        <td>{convertToDate(item.joinAt)}</td>
                                        <td><img src={convertToImgPath(item.avatarThumbnailUrl)} alt="Character" className='rank-thumbnail'/></td>
                                        <td>{item.reward}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">데이터가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
        //html 문서 작성
    );
};

export default Ranking;