import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "firebaseMain";
import React, { useState } from "react";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const Nweetfactory = ({ userObj }) => {
  const [twit, setTwit] = useState(""); //text 입력란 제어
  const [fileURL, setFileURL] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attch = "";
    if (fileURL !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, fileURL, "data_url");
      attch = await getDownloadURL(response.ref);
    }
    if ( twit !== "" ){ // twit 값이 없다면 Submit 하지 못하도록 if문 배치
    const docRef = addDoc(collection(dbService, "Twit"), {
      text: twit,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attch,
      username: userObj.displayName,
    });
    setTwit(""); // Submit시 text란 비우기 But 동작 안함
    setFileURL("");
    console.log("Document written with ID: ", (await docRef).id);
    }
    else{
      console.log("Twit is not available");
      window.alert("Error: Please Typing") // 알림창 구현 하였으나 디테일 필요 (애니메이션, css 등등)
    }
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
    } = event; //event.target.files
    const theFiles = files[0]; //files 배열 생성
    const reader = new FileReader();
    reader.readAsDataURL(theFiles);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileURL(result);
    };
  };

  const onClearPhto = () => setFileURL(""); // 사진 지우기

  return (

    <div ClassName="container">
      {/* 폰트 사이즈 키우기 */}
      <div style={{ marginTop: -50, marginBottom: 20, textAlign: "center" }}>{userObj.displayName}님 반갑습니다!</div> 
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          type="text"
          placeholder="Please typing"
          onChange={onChange}
          className="factoryInput__input"
          value={twit}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>

      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add Photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {fileURL && (
        <div className="factoryForm__attachment">
          <img
            alt=""
            src={fileURL}
            style={{
              backgroundImage: fileURL,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearPhto}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
    </div>
  );
};

export default Nweetfactory;
