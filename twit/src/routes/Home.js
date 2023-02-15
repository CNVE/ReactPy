import { collection, addDoc, getDocs } from "firebase/firestore"; // firebase 버전 업데이트
import { dbService } from "firebaseMain";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [twit, setTwit] = useState(""); //text 입력란 제어
  const [twits, setTwits] = useState([]); //firebase 저장 값 제어
  console.log(twits);

  const getTwits = async () => {
    const q = await getDocs(collection(dbService, "Twit"));
    //console.log(q);
    //console.log(querySnapshot); //database의 저장 값 잘 가져옴
    q.forEach((doc) => {
      const twitObject = {
        ...doc.data(),
        id: doc.id,
      };
      console.log(doc.id, " => ", doc.data());
      setTwits((prev) => [twitObject, ...prev]);
    });
  };

  useEffect(() => {
    getTwits();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      const docRef = addDoc(collection(dbService, "Twit"), {
        twit,
        createAt: Date.now(),
      });
      setTwit(""); // Submit시 text란 비우기 But 동작 안함
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwit(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Please typing" onChange={onChange} />
        <input type="submit" value="Twit" />
      </form>
      <div>
        {twits.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.twit}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
