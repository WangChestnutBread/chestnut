import LogoRank from "../molecules/Board/LogoRank";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";
import "./RankingTemplate.css"

const mokData = [
  {
    id: 0,
    name: "기무라 타쿠야",
    date: "2020-01-01",
    rats: "상 받은 다람쥐",
    chestnut: "30개",
  },
  {
    id: 1,
    name: "기무라 타쿠야",
    date: "2020-01-01",
    rats: "상 받은 다람쥐",
    chestnut: "30개",
  },
  {
    id: 2,
    name: "기무라 타쿠야",
    date: "2020-01-01",
    rats: "상 받은 다람쥐",
    chestnut: "30개",
  },
];

const RankingTemplate = () => {
  return (
    <div>
      {/* 헤더 */}
      <div className="NavbarExample">
        <div className="NavbarButton">
          <div className="LeftButton">
            <StudyBackButton />
            <ChestNutButton />
          </div>
        </div>
      </div>
      <div className="container">
        {/* 로고 */}
        <div>
          <LogoRank />
        </div>
        {/* 첫 줄 유저, 가입일자, 케릭터진화, 밤송이 개수 */}
        <div className="row text-center  align-items-center mt-5">
          <div className="col-1">#</div>
          <div className="col-3">
            <img src="/image/User.png" alt="유저" className="user" />
            유저
          </div>
          <div className="col-3">
            <img src="/image/calender.png" alt="달력" className="calender" /> 가입 날자
          </div>
          <div className="col-3">
            <img src="/image/rats.png" alt="쥐" className="rats" />
            케릭터 진화
          </div>
          <div className="col-2">
            <img src="image/smallchestnut.png" alt="밤송이" className="chestnut" /> 밤송이 개수
          </div>
        </div>
        {/* 랭킹 데이터 */}
        <div>
          {mokData.map((data, index) => {
            return (
              <div key={index} className="row text-center  align-items-center">
                <div className="col-1 mt-4 mb-2">{data.id+1}</div>
                <div className="col-3">{data.name}</div>
                <div className="col-3">{data.date}</div>
                <div className="col-3">{data.rats}</div>
                <div className="col-2">{data.chestnut}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default RankingTemplate;
