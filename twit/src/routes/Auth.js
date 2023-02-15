////////////////////////////////////////로그인 페이지/////////////////////////////////////////
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth"; // Firebase 문법 변경
import { authService, firebaseInstance } from "firebaseMain";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState(""); // 아이디 변경 감지
  const [password, setPassword] = useState(""); // 비밀번호 변경 감지
  const [newAccount, setNewAccount] = useState(true); // 로그인과 회원가입 구분
  const [error, setError] = useState(""); // 에러 메시지 변경 감지

  const onChange = (event) => {
    // 한개의 onChange 이벤트로 아이디, 비밀번호 컨트롤
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      // input의 이름이 이메일일 경우
      setEmail(value); // setEmail의 value값 변경
    } else if (name === "password") {
      // input의 이름이 이메일일 경우
      setPassword(value); // setPassword의 value값 변경
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Submit의 기본 동작을 억제(기본 동작: Submit시 Page Refresh)
    try {
      let data; //이메일 or 비밀번호를 저장
      const auth = getAuth(); //Firebase 업데이트로 인해 달라진 문법
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data); // 로그인시 콘솔창에 포시
    } catch (error) {
      //에러시
      setError(error.message); // setError조정하여 error message 제어
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev); // True, False 이용하여 setNewAccount 반전

  const onSocialClick = async (event) => {
    const {
      currentTarget: { name },
    } = event;
    let provider;
    if (name === "Google") {
      provider = new GoogleAuthProvider();
    } else if (name === "Github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div>
      {/* form구문에 onSubmit 추가 */}
      <form onSubmit={onSubmit}>
        {/* 이메일 입력란 */}
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        {/* 비밀번호 입력란 */}
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        {/* Submit button의 value에 newAccount를 이용한 로그인 구분 */}
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      {/* onClick 이벤트를 toggleAccount로 추가 */}
      <span onClick={toggleAccount}>
        {/* 로그인과 회원가입을 toggleAccount로 추가한 onClick 이벤트로 변경 */}
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        {/* 다른 매체를 이용한 로그인수단 */}
        <button name="Google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="Github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;

//대문자 소문자 구분 제발 하자
//구글과 깃헙 연동 도중 name값 앞에 대문자 빼먹어서 고치는데 2시간 걸렸다.
