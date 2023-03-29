import React, { useEffect, useState } from "react";
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
