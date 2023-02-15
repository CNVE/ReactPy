import { authService } from "firebaseMain";
import React from "react";
import { useHistory } from "react-router-dom"; //react-router-dom의 함수 or Router.js파일에 Redirect 함수를 통해 로그아웃 후 Home 복귀

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut(); // Service LogOut을 할 때
    history.push("/"); //기본 홈으로 돌아가기
  };
  return (
    <>
      <button onClick={onLogOutClick}>Profile</button>
    </>
  );
};
export default Profile;
