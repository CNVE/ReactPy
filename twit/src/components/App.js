import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService } from "firebaseMain";
import { CSSTransition } from "react-transition-group";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [init, setInit] = useState(false); // 페이지 로드 확인 ex) 로드 전까지 Initializing... 표시, 로드 후 Home 보이기
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 여부 확인
  const [userObj, setUserObj] = useState(""); // user값 받아서 사용할 때 사용

  useEffect(() => {
    //한번 실행
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // auth의 상태가 변했을때
      if (user) {
        //user가 진실일 때 IsLoggedIn 값 True 반환
        setIsLoggedIn(true);
        setUserObj({
          // setUserObj값에 필요한 user값 저장, 전체 user값 사용시 범위가 넓어 에러 발생
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        //user가 거짓일 때 IsLoggedIn 값 false 반환
        setIsLoggedIn(false); //실행x
        setUserObj(null); //실행x
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
      <Router>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      </Router>
    </>
  );
}

export default App;


// 유저 오브젝트 확인, 리네임시 Twit 값에는 변화가 보이지 않음