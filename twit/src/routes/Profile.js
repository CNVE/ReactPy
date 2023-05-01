import GetMyTwit from "components/GetMyTwit";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { authService, dbService } from "firebaseMain";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; //react-router-dom의 함수 or Router.js파일에 Redirect 함수를 통해 로그아웃 후 Home 복귀
import { motion } from "framer-motion";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut(); // Service LogOut을 할 때
    history.push("/"); //기본 홈으로 돌아가기
    refreshUser();
  };

  let changedata;
  const getMyTwits = async () => {
    const q = query(
      collection(dbService, "Twit"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateDoc(dbService, "Twit");
      console.log(doc.id, " == ", doc.data());
    });
  };

  console.log(changedata);

  useEffect(() => {
    getMyTwits();
  });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <motion.div
    /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         exit={{opacity: 0}}
         >
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          autoFocus
          onChange={onChange}
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <div className="factoryInput__container">
      </div>
    </div>
    </motion.div>
  );
};
export default Profile;
