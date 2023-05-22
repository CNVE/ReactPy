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
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import "Fonts/Fonts.css";
import { motion } from "framer-motion";
import { faAlignCenter, faSchool } from "@fortawesome/free-solid-svg-icons";
import AdminAuth from "components/AdminAuth";


const AdminPanal = () => {
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
 
    <motion.div className="authContainer" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 1.5,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}  >
      <FontAwesomeIcon
        icon={faSchool}
        color={"171717"}
        size="3x"
        style={{ marginBottom: 20, marginTop: 100 }}
      />
      <motion.div className="titlel" style={{marginBottom: 20, fontSize :30}} 
       >Pocheol_Admin</motion.div>
      <AdminAuth />
    </motion.div>
  );
};
export default AdminPanal;

//대문자 소문자 구분 제발 하자
//구글과 깃헙 연동 도중 name값 앞에 대문자 빼먹어서 고치는데 2시간 걸렸다.
