import GetMyTwit from "components/GetMyTwit";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, dbService } from "firebaseMain";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; //react-router-dom의 함수 or Router.js파일에 Redirect 함수를 통해 로그아웃 후 Home 복귀

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut(); // Service LogOut을 할 때
    history.push("/"); //기본 홈으로 돌아가기
    refreshUser();
  };
  const getMyTwits = async () => {
    const q = query(
      collection(dbService, "Twit"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " == ", doc.data());
    });
  };

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
      <h1>My Twit</h1>
      {/* <GetMyTwit getMyTwits={getMyTwits} /> */}
    </div>
  );
};
export default Profile;
