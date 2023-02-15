import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false); // 페이지 로드 확인 ex) 로드 전까지 Initializing... 표시, 로드 후 Home 보이기
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 여부 확인
  useEffect(() => {
    //한번 실행
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user가 진실일 때 IsLoggedIn 값 True 반환
        setIsLoggedIn(true);
      } else {
        //user가 거짓일 때 IsLoggedIn 값 false 반환
        setIsLoggedIn(false);
      }
      setInit(true); //로드 완료 확인 => setInit값 True 반환
    });
  }, []);
  return (
    <>
      {/* 로드 완료시 AppRouter 표시, 완료X => Initializing...표시 */}
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Twit</footer>
    </>
  );
}

export default App;
