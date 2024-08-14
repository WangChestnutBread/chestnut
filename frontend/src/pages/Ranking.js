import React, {useEffect, useState, useCallback} from 'react';
import './Ranking.css';
import baseApi from '../api/fetchAPI';
import NavbarExample from '../templates/NavbarExample';

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
            <NavbarExample/>

            <div className='ranking-container'>
                {/* 로고 */}
                <h1 style={{fontSize:"2rem", color:"gray", margin:"50px"}}>Rank Top 10</h1>
                {/* 표 */}
                <div className='ranking-table-container' style={{"fontSize":"1.5rem"}}>
                    <table className='ranking-table'>
                        <thead className='ranking-thead'>
                            <tr >
                                <td>순위</td>
                                <td>
                                    유저
                                </td>
                                <td>
                                    가입일자
                                </td>
                                <td>
                                    캐릭터
                                </td>
                                <td>
                                    밤송이
                                </td>
                            </tr>
                        </thead>
                        <tbody  style={{"fontSize":"1rem"}}>
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