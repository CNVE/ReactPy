import React from "react";
import { Link } from "react-router-dom";
// Home과 Profile를 눌렀을 때 Realtime 처리 오류 => react-router-dom 과 react의 충돌 => "npm i react-router-dom@5.3.3"으로 업데이트 해결
const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Profile">My profile</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
