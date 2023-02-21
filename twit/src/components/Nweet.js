import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "firebaseMain";
import React, { useState } from "react";
import SeeTwit from "./GetMyTwit";
import SettingMy from "./SeeTwit";

const Nweet = ({ nweetObj, isOwner, refreshUser, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(nweetObj.text);
  //const [nameUpdated, setNameUpdated] = useState(nweetObj.username);
  const deed = doc(dbService, "Twit", `${nweetObj.id}`);
  console.log(deed);
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
        <SeeTwit
          deed={deed}
          toggleEditing={toggleEditing}
          nweetObj={nweetObj}
          isOwner={isOwner}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      )}
    </div>
  );
};

export default Nweet;
