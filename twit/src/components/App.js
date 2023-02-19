import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService } from "firebaseMain";

function App() {
  const [init, setInit] = useState(false); // 페이지 로드 확인 ex) 로드 전까지 Initializing... 표시, 로드 후 Home 보이기
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 여부 확인
  const [userObj, setUserObj] = useState("");
  useEffect(() => {
    //한번 실행
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user가 진실일 때 IsLoggedIn 값 True 반환
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        //user가 거짓일 때 IsLoggedIn 값 false 반환
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true); //로드 완료 확인 => setInit값 True 반환
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };
  return (
    <>
      {/* 로드 완료시 AppRouter 표시, 완료X => Initializing...표시 */}
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;