import { async } from "@firebase/util";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "firebaseMain";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(nweetObj.text);
  const deed = doc(dbService, "Twit", `${nweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Delete?");
    console.log(ok);
    if (ok === true) {
      await deleteDoc(deed);
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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Editing Here"
              value={newTwit}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Twit" />
          </form>
          <button onClick={toggleEditing}>cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;