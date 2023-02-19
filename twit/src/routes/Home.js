import Nweet from "components/Nweet";
import Nweetfactory from "components/Nweetfactory";
import { collection, onSnapshot, orderBy } from "firebase/firestore"; // firebase 버전 업데이트
import { dbService } from "firebaseMain";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  //console.log(userObj);
  const [twits, setTwits] = useState([]); //firebase 저장 값 제어

  const real = () => {
    onSnapshot(
      collection(dbService, "Twit"),
      orderBy("createdAt", "desc"),
      (snapshot) => {
        const twitArray = snapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setTwits(twitArray);
      }
    );
  };

  useEffect(() => {
    real();
  }, []);

  return (
    <div className="container">
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
