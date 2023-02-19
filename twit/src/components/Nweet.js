import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "firebaseMain";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(nweetObj.text);
  const deed = doc(dbService, "Twit", `${nweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Delete?");
    console.log(ok);
    if (ok === true) {
      await deleteDoc(deed);
      const urlRef = ref(storageService, nweetObj.attch);
      await deleteObject(urlRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(deed, { text: newTwit });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwit(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Editing Here"
              value={newTwit}
              onChange={onChange}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Twit" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
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
      )}
    </div>
  );
};

export default Nweet;
