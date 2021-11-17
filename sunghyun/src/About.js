import React from "react";
import qs from 'qs';
import {useLocation} from "react-router-dom";

const About=()=>{
  const location=useLocation();
  const query=qs.parse(location.search,{
    ignoreQueryPrefix: true
  });
  const detail=query.detail==='true';

  return (
    <div>
      <h1>소개</h1>
      <p>나는 김성현이고 리액트 라우터 실습 중이다.</p>
      {detail && <p>추가적인 정보</p>}
    </div>
  )
}

export default About;