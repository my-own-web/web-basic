import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './design/Button';
import Input from './design/Input';
import SmallBlock from './design/SmallBlock';
import Cookies from 'universal-cookie';

function LoginPage() {
    // 페이지 이동 준비
    let navigate = useNavigate();
    // 입력
    const [inputs, setInputs] = useState({
        id: '',
        password: ''
    });
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 쿠키
    const cookies = new Cookies();

    // express에 데이터 보내기. onSubmit에서 호출
    const fetchValid = async() =>{
        try{
            const res = await axios.post('http://localhost:3001/login', inputs, {withCredentials: true});
            // 크로스 도메인 쿠키 허용
            console.log('쿠키:',cookies.get('valid')); // dbg
            console.log('res.data:', res.data);
            navigate("/todolist");
        } catch(err){
            console.log(err);
            alert('Wrong ID or PASSWORD'); 
            // cookies.remove('valid'); // 서버에서 쿠키 삭제
        } 
        setInputs({ id: '', password: '' });
    };

    const onInputKeyPress = (e) => {
        if (e.key == 'Enter') {
            fetchValid();
        }
    }

    return (
        <SmallBlock>
            <p>로그인</p>
            <Input name="id" placeholder="ID" onChange={onChange} value={inputs.id} />
            <Input name="password" placeholder="PASSWORD" onChange={onChange} value={inputs.password} onKeyPress={onInputKeyPress} />
            <div>
                <Button color='pink' style={{ marginRight: '40%' }} onClick={() => {navigate("/join")}}>회원가입</Button>
                <Button onClick={fetchValid}>로그인</Button>
            </div>
        </SmallBlock>
    )
}

export default LoginPage;