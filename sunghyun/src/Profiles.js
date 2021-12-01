import React from "react";
import {Link, Route, Routes} from 'react-router-dom';
import Profile from './Profile';

const Profiles=()=>{
  return (
    <div>
      <h3>유저 목록 : </h3>
      <ul>
        <li>
          <Link to='/profiles/witch'>김성현</Link>
        </li>
        <li>
          <Link to='/profiles/jakads'>김창민</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/profiles"
          render={()=>
            <div>유저를 선택하세요</div>
          }
        />
        <Route path='/profiles/:username' element={<Profile/>} />
      </Routes>

    </div>
  )
}

export default Profiles;