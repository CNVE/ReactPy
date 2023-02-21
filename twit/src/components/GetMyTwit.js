//profile에 보여줄 나의 Twit

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { storageService } from "firebaseMain";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc } from "firebase/firestore";

const SeeTwit = ({ deed, toggleEditing, nweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Delete?");
    console.log(ok);
    if (ok === true) {
      await deleteDoc(deed);
      const urlRef = ref(storageService, nweetObj.attch);
      await deleteObject(urlRef);
    }
  };
  return (
    <>
      {/* 내용과 유저 이름 불러오기 */}
      <h4>{nweetObj.text}</h4>
      <p>Twit By: {nweetObj.username}</p>
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
