import React, { useState } from 'react';
import Popup from './design/Popup';
import Input from './design/Input';
import Button from './design/Button';
import SmallBlock from './design/SmallBlock';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function JoinPage(){
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({
        newId: '',
        newPassword: ''
    });

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onJoin = async () => {
        if(inputs.newId == '' || inputs.newPassword == ''){
            alert("아이디나 패스워드는 한 글자 이상이야 합니다.");
            return;
        }

        //send data to server
        try{
            const res =  await axios.post('http://localhost:3001/join',inputs);
            if(res.data){
                alert('환영합니다!'); // chk
                navigate("/");
            }
            else{
                alert('사용할 수 없는 ID입니다.')
            }
        } catch(err){
            console.log(err);
        }

        setInputs({ newId: '', newPassword: '' });
    };


    return(
        <SmallBlock>
            <p>회원가입</p>
            <Input name="newId" placeholder="ID" onChange={onChange} value={inputs.newId} />
            <Input name="newPassword" placeholder="PASSWORD" onChange={onChange} value={inputs.newPassword} />
            <div>
                <Button onClick={()=>{navigate("/")}} color={'#CFD4D1'} style={{ marginRight: '60%' }}>취소</Button>
                <Button onClick={onJoin} color='pink' style={{float:'right'}}>완료</Button>
            </div>
        </SmallBlock>

    );
}

export default JoinPage;