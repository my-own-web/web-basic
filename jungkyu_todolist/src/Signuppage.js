import React, {useState} from 'react';
import Inputbox from './login_components/Inputbox';
import Button from './login_components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;
function Signuppage(){
    let navi = useNavigate();
    const [input, setinput] = useState({newId: '', newPassword: ''});
    const onChange= (e) =>{
        const {value, name} = e.target;
        setinput({...input, [name]: value});
    };
    const onSignup = async()=>{
        if(input.newId === '' || input.newPassword === ''){
            alert("WRONG");
            return;
        }
        try{
            const res = await axios.post('http://localhost:3002/join',input);
            if(res.data){
                alert('환영합니다');
                navi('/');
            }
            else{
                alert('error');
            }
            
        }catch(err){
            console.error(err);
        }
        setinput({newID: '', newPassword: ''});
    };

    return(
        <AppBlock>
        <div>
            <h1>회원가입</h1>
            <Inputbox box="이메일" name="newId" placeholder="이메일" onChange={onChange} value={input.newId} />
            <Inputbox box="비밀번호" name="newPassword" placeholder="비밀번호" type="password" onChange={onChange} value={input.newPassword}/>
        </div>
        <Button onClick={()=>{navi("/")}}> 취소 </Button>
        <Button onClick={onSignup}>가입</Button>
    </AppBlock>
    )
}
export default Signuppage;