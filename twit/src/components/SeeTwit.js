import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "firebaseMain";
import { deleteObject, ref } from "firebase/storage";
import { collection, deleteDoc, onSnapshot } from "firebase/firestore";

const SeeTwit = ({
  deed,
  toggleEditing,
  nweetObj,
  isOwner,
  userObj,
  refreshUser,
}) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Delete?");
    console.log(ok);
    if (ok === true) {
      await deleteDoc(deed);
      const urlRef = ref(storageService, nweetObj.attch);
      await deleteObject(urlRef);
    }
  };
  /* if (nweetObj.username !== userObj.displayName) {
    refreshUser();
    console.log(nweetObj.username);
  } else {
    console.log("Error");
  } */

  const updateTwitBy = () => {
    // snapshot이 실시간으로 firebase의 Twit이란 이름의 collection의 변화 감지
    onSnapshot(
      collection(dbService, "Twit"), // collection에 있는 Twit 감시
      (snapshot) => {
        // snapshot이 변화 감지시
        const updateTwitByArray = snapshot.docs.map((docs) => ({
          id: docs.id, //id값 저장
          ...docs.data(), // 표시할 데이터 값
        }));
        nweetObj(updateTwitByArray);
        console.log(updateTwitByArray); // Twit의 저장값 변화 부분에 대입
      }
    );
  };

  return (
    <>
      {/* 내용과 유저 이름 불러오기 */}
      <h4>{nweetObj.text}</h4>
      <p>Twit By: {userObj.displayName}</p>
      {nweetObj.attch && <img src={nweetObj.attch} alt="" />}
      {isOwner && (
        <div class="nweet__actions">
          <span onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span onClick={toggleEditing}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
        </div>
      )}
    </>
  );
};

export default SeeTwit;
