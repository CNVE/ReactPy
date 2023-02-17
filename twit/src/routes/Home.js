import Nweet from "components/Nweet";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore"; // firebase 버전 업데이트
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { dbService, storageService } from "firebaseMain";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const Home = ({ userObj }) => {
  //console.log(userObj);
  const [twit, setTwit] = useState(""); //text 입력란 제어
  const [twits, setTwits] = useState([]); //firebase 저장 값 제어
  const [fileURL, setFileURL] = useState("");
  //console.log(twits);

  /*const getTwits = async () => {
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
  };*/

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let attch = "";
    if (fileURL !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, fileURL, "data_url");
      attch = await getDownloadURL(response.ref);
    }

    const docRef = addDoc(collection(dbService, "Twit"), {
      text: twit,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attch,
    });
    setTwit(""); // Submit시 text란 비우기 But 동작 안함
    setFileURL("");
    console.log("Document written with ID: ", docRef.id);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTwit(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFiles = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFiles);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileURL(result);
    };
  };

  const onClearPhto = () => setFileURL(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Please typing" onChange={onChange} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Twit" />
        {fileURL && (
          <div>
            <img src={fileURL} width="50px" height="50px" />
            <button onClick={onClearPhto}>Clear file</button>
          </div>
        )}
      </form>
      <div>
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
