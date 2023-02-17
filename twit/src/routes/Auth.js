////////////////////////////////////////로그인 페이지/////////////////////////////////////////
import Authform from "components/Authform";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <Authform />
      <div className="authBtns">
        {/* 다른 매체를 이용한 로그인수단 */}
        <button name="Google" onClick={onSocialClick} className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="Github" onClick={onSocialClick} className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;

//대문자 소문자 구분 제발 하자
//구글과 깃헙 연동 도중 name값 앞에 대문자 빼먹어서 고치는데 2시간 걸렸다.
