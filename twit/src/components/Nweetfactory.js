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

  const onClearPhto = () => setFileURL("");
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          type="text"
          placeholder="Please typing"
          onChange={onChange}
          className="factoryInput__input"
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
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
  );
};

export default Nweetfactory;
