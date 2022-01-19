import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import { infos } from './LoginContext';
import { useNavigate } from 'react-router-dom';
import Popup from './login/Popup';
import axios from 'axios';

const LoginBlock = styled.div`
    width: 200px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%); 
    background: powderblue;
    border-radius: 20px; // 모서리 둥굴게
    box-shadow: 0 0 8px 0 rgba(0,0,0,100); // 박스 감싸는 그림자

    margin: 0 auto; // 페이지 중앙

    padding: 20px;
    margin-top: 10px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column; // 플렉스 컨테이너 내 아이템 배치 주축 및 방향
`;

const Button = styled.button`
    border: none;
    width: 30%;
    padding: 3px;
    margin-top:10px;
    background: ${props => props.color || '#38d9a9'};
    &:hover{
        background: ${props => lighten(0.1, props.color || '#38d9a9')};
    }
    &:active{
        background: ${props => darken(0.1, props.color || '#38d9a9')};
    }
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

// infos 배열에 id, password가 존재하면 true
// 없으면 false 반환
function isValid({ id, password }) {
    const index = infos.find((element) => element.id === id);
    if (index && index.password === password) return true;
    else return false;
}

function LoginPage() {
    // 페이지 이동 준비
    let navigate = useNavigate();
    // 입력
    const [inputs, setInputs] = useState({
        id: '',
        password: ''
    });
    // 제출한 id, password
    const [submits, setSubmits] = useState({
        id: '',
        password: ''
    });
    
    // wrong: true->invalid ID/PASSWORD
    const [wrong, setWrong] = useState(false);

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 로그인 버튼 누르면 그때까지 입력받은 id, password를 제출, validity check
    const onSubmit = () => {
        setSubmits({ id: inputs.id, password: inputs.password });
        // setValid(isValid(inputs));
        if (isValid(inputs)) { // 투두리스트 페이지로 이동
            setWrong(false);
            navigate("/todolist");
        }
        else {
            setInputs({ id: '', password: '' });
            setWrong(true);
        }
    };

    const onInputKeyPress = (e) => {
        if (e.key == 'Enter') {
            onSubmit();
        }
    }

    const onClick = () => {
            setWrong(false);
    }

    // async function fetchData(){
    //     try{
    //         const {data} = await axios.get("http://localhost:3001/todo");
    //         console.log(data);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }

    // useEffect(()=>{
    //     fetchData();
    // }, []);

    return (
        <>
            <LoginBlock>
                <Input name="id" placeholder="ID" onChange={onChange} value={inputs.id} />
                <Input name="password" placeholder="PASSWORD" onChange={onChange} value={inputs.password} onKeyPress={onInputKeyPress} />
                <div>
                    <Button color='pink' style={{ marginRight: '40%' }}>회원가입</Button>
                    <Button onClick={onSubmit}>로그인</Button>
                </div>
            </LoginBlock>


            {/* action for wrong login*/}
            <Popup show={wrong}>
                <div >Wrong ID or PASSWORD</div>
                <Button onClick={onClick} color='#CFD4D1' style={{float:'right'}}>OK</Button>
            </Popup>

            {/*dbg*/}
            {/* <div style={{ margin: '0 auto', width: '200px' }}>
                <p>
                    <div><b>ID:</b> {submits.id}</div>
                    <div><b>PASSWORD:</b> {submits.password}</div>
                </p>

                <p style={{ color: "blue" }}>
                    <div><b>infos 배열: id password</b></div>
                    {infos.map(info => <div>{info.id} {info.password}</div>)}
                </p>
            </div> */}
        </>
    )
}

export default LoginPage;