import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,signInAnonymously,
  } from "firebase/auth";
  import React, { useState } from "react";
  import { motion } from "framer-motion";
  
  const AdminAuth = () => {
    const [email, setEmail] = useState(""); // 아이디 변경 감지
    const [password, setPassword] = useState(""); // 비밀번호 변경 감지
    const [newAccount, setNewAccount] = useState(true); // 로그인과 회원가입 구분
    const [error, setError] = useState(""); // 에러 메시지 변경 감지
    const toggleAccount = () => setNewAccount((prev) => !prev); // True, False 이용하여 setNewAccount 반전
    const onSubmit = async (event) => {
      event.preventDefault(); // Submit의 기본 동작을 억제(기본 동작: Submit시 Page Refresh)
      try {
        let signdata, logdata; //이메일 or 비밀번호를 저장
        if (signdata != signdata.endsWith('gmail.com')){ // signdata의 마지막 부분이 gmail.com 으로 끝나지 않을시 
          alert("Error"); // 에러 도출
        }
        const auth = getAuth(); //Firebase 업데이트로 인해 달라진 문법
        if (newAccount) {
          signdata = await createUserWithEmailAndPassword(auth, email, password);
        } else {
          if(email === "guest@example.com" && password === "guestpass"){logdata = await signInAnonymously(auth);}
          else {
            logdata = await signInWithEmailAndPassword(auth, email, password);
          }
        }
        console.log("Sign?", signdata, "Log?", logdata); // 로그인시 콘솔창에 포시
      } catch (error) {
        //에러시
        setError(error.message); // setError조정하여 error message 제어
      }
    
    };
  
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
  
    const loginAsGuest = async () => {
      try {
        const auth = getAuth();
        const logdata = await signInAnonymously(auth); // Guest login
    
        console.log("Guest Login Successful", logdata);
      } catch (error) {
        setError(error.message);
      }
    };

    return (
      <>
        <form onSubmit={onSubmit} className="container">
          {/* Admin ID 입력란 */}
          <input
            name="email"
            type="text"
            placeholder="Admin ID"
            required
            value={email}
            onChange={onChange}
            className="authInput"
          />
          {/* 비밀번호 입력란 */}
          <input
            name="password"
            type="password"
            placeholder="Hi"
            required
            value={password}
            onChange={onChange}
            className="authInput"
            autoComplete="off"
          />
          {/* Submit button의 value에 newAccount를 이용한 로그인 구분 */}
          <input
            type="submit"
            className="authInput authSubmit"
            style = {{ textAlign: "center" }}
            value={"Welcome " + email}
          />
          <input
          type="submit"
          className="authInput authSubmit"
          style={{ textAlign: "center" }}
          onClick={loginAsGuest}
          value={"Guest Login"}
          />
          
          {error && <span className="authError">{error}</span>}
          {/* 에러 메시지 if 문을 이용하여 한글 메시지 띄우기 */}
        </form>
      </>
    );
  };
  
  export default AdminAuth;
  