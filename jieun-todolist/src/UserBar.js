import styled from 'styled-components';
import React from 'react';
import { useUserId } from './TodoContext';
import { AiFillSetting } from 'react-icons/ai';
import Button from './design/Button';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Bar = styled.div`
position: relative; 
background: white;
// margin:  // 페이지 중앙
padding: 0 10px 0 10px;


  // width: 20%

  h1 {
    color: #20c997;
    font-weight: bold;
    // text-align: center;
    padding-left: 20px;
  }

  .button {
    margin: 25px 0 25px 0;
  }

`

function UserBar() {
  const userId = useUserId();
  console.log('user:', userId);

  let navigate = useNavigate();
  const cookies = new Cookies();
  const onLogOut = async () => {
    cookies.remove('valid');
    // try {
    //   await axios.post('/logout', '', { withCredentials: true });
    // } catch (error) {
    //   console.log(error);
    // }
    navigate('/');
  }

  // const [showSetting, setShowSetting] = useState(false);

  return (
    <Bar>
      {/* 탈퇴 재확인 팝업
        <Popup show={false}>
            <p>정말로 탈퇴하겠습니까?</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '60px'}}>
                <Button color='pink'>네</Button>
                <Button>아니오</Button>
            </div>
        </Popup> */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 65px', columnGap: '10px' }}>
        <h1>{userId}'s To-Do List</h1>
        <Button color='pink' className='button' onClick={onLogOut}>로그아웃</Button>
        {/* <Button color='grey'>회원탈퇴</Button> */}
      </div>
    </Bar>
  );
}

export default UserBar;