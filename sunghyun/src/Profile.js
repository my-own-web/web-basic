import React from "react";
import {Link, Route, useParams} from "react-router-dom";

const profileData={
  witch:{
    name:'김성현',
    description:'이름은 김성현이고 서강대에 다니고 있다.'
  },
};

const Profile=()=>{
  //match에는 주소가 규칙과 어떻게 매칭되는지에 대한 정보가 있다
  const {username}=useParams();
  const profile=profileData[username];

  if(!profile){
    return <div>없는 유저이다.</div>
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>
        {profile.description}
      </p>
    </div>
  )
}

export default Profile;