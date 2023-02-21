import Nweet from "components/Nweet";
import Nweetfactory from "components/Nweetfactory";
import { collection, onSnapshot, orderBy } from "firebase/firestore"; // firebase 버전 업데이트
import { dbService } from "firebaseMain";
import React, { useEffect, useState } from "react";

const Home = ({ userObj, refreshUser }) => {
  console.log(userObj);
  const [twits, setTwits] = useState([]); //firebase 저장 값 제어

  const real = () => {
    // snapshot이 실시간으로 firebase의 Twit이란 이름의 collection의 변화 감지
    onSnapshot(
      collection(dbService, "Twit"), // collection에 있는 Twit 감시
      orderBy("createdAt", "desc"), //생성 날짜 정렬
      (snapshot) => {
        // snapshot이 변화 감지시
        const twitArray = snapshot.docs.map((docs) => ({
          id: docs.id, //id값 저장
          ...docs.data(), // 표시할 데이터 값
        }));
        setTwits(twitArray);
        console.log(twitArray); // Twit의 저장값 변화 부분에 대입
      }
    );
  };

  useEffect(() => {
    real(); // refresh시 최초 한번 실행
  }, []);

  return (
    <div className="container">
      {/* userObj라는 props값 전달 */}
      <Nweetfactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {twits.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
