////////////////////////////////////////로그인 페이지/////////////////////////////////////////
import Authform from "components/Authform";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth"; // Firebase 문법 변경
import { authService } from "firebaseMain";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "Fonts/Fonts.css";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      currentTarget: { name },
    } = event; // event.target.name과 같은 의미
    let provider; // 변수 provider 선언
    if (name === "Google") {
      // 이름이 Google이라면
      provider = new GoogleAuthProvider(); //provider에 GoogleAuthProvider 대입
    } else if (name === "Github") {
      // 아니고 만약 이름이 Github이라면
      provider = new GithubAuthProvider(); //provider에 GithubAuthProvider 대입
    }
    const data = await signInWithPopup(authService, provider); // if문 실행 뒤 data 변수에 구글인지 깃헙인지 로그인 서비스에 알려줌
    console.log(data);
  };
  return (
 
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 20 }}
      />
      <div className="titlel" style={{marginBottom: 20, fontSize :30}}>Twitter</div>
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
