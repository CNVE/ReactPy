import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faReact,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "firebaseMain";
import HomeNav from "../routes/HomeNav";
// Home과 Profile를 눌렀을 때 Realtime 처리 오류 => react-router-dom 과 react의 충돌 => "npm i react-router-dom@5.3.3"으로 업데이트 해결


const Navigation = ({ userObj, refreshUser }) => {

  const history = useHistory();
  const onLogOutClick = () => {
    if (window.confirm("You want EXIT?")) {
      authService.signOut(); // Service LogOut을 할 때
      history.push("/"); //기본 홈으로 돌아가기
      refreshUser();  
    } else {

    }
  };
  

  const boxVariants = {
    out: {
      y: -100,
    },
    in: {
      y: 0,
      transition: {
        duration: 0.6,
        // first child는 parent가 나타나고 0.5s 후에 나타난다. 
        delayChildren: 1,
        // first child의 sibling child는 0.5s의 간격을 두고 나타난다
        staggerChildren: 0.5,
				// staggerChildren이 없다면 
				//모든 child가 parent가 나타나고0.5s 후 동시에 나타난다. 
      },
    },
  };

  const iconVariants = {
    out: {
      x: -600, // translateX(-600)
    },
    in: {
      x: 0
    },
  };

  const iconVariantsv2 = {
    out: {
      x: -600, // translateX(-600)
    },
    in: {
      x: 0,
    },
  };

  const iconVariantsv3 = {
    out: {
      x: -600, // translateX(-600)
    },
    in: {
      x: 0,
    },
  };
 
  return (
  <nav>
    <ul>
      <HomeNav />
    </ul>
    <motion.ul variants={boxVariants} initial="out" animate="in">
      <motion.li
        role="img"
        aria-labelledby="magic wand"
        variants={iconVariantsv2}
				// parent의 initial, animate를 그대로 상속받기 때문에 
				// 속성을 입력하지 않아도된다. 
      >
        <Link
          to="/profile"
          style={{
            marginRight: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>{userObj.displayName}</span>
        </Link>
      </motion.li>

      <motion.li
        role="img"
        aria-labelledby="magic wand"
        variants={iconVariants}
				// parent의 initial, animate를 그대로 상속받기 때문에 
				// 속성을 입력하지 않아도된다. 
      >
        <Link to="/" style={{  }}>
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </motion.li>

      <motion.li
        role="img"
        aria-labelledby="magic wand"
        variants={iconVariantsv3}
				// parent의 initial, animate를 그대로 상속받기 때문에 
				// 속성을 입력하지 않아도된다. 
      >
        <Link to="/" style={{  marginLeft: 30,
            display: "flex",
            flexDirection: "column",
            fontSize: 12,}} >
          <FontAwesomeIcon icon={faPowerOff} color={"#04AAFF"} size="2x" onClick = {onLogOutClick} />
          <p style={{marginTop: 10}}>EXIT</p>
        </Link>
      </motion.li>

    </motion.ul>
  </nav>); 
  };

export default Navigation;
