import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Positioner = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50% );
`;


const Container = styled.div`
   width: 500px;
   background: white;
   margin-top: 100px;
   padding: 20px;
`;


const Input = styled.input`
   position: relative;
   overflow: hidden;
   width: 100%;
   height: 40px;
   margin: 0 0 8px;
   padding: 5px 39px 5px 11px;
   border: solid 1px #dadada;
   background: #fff;
   box-sizing: border-box;
`;

const Button = styled.div`
   font-size: 18px;
   font-weight: 700;
   line-height: 49px;
   display: block;
   width: 100%;
   height: 49px;
   marign: 16px 0 7px;
   cursor: pointer;
   text-align: center;
   color: #fff;
   border: none;
   border-radius: 0;
   background-color: pink;
   ${({ disabled }) =>
    disabled &&
`
background-color: #efefef;
`}
`;

function LoginForm() {
    return (
        <Positioner>

            <Container>
                <div ClassName="login"> 
                <h1>LOGIN</h1>
            <Input id="id" name="id" placeholder="아이디를 입력해주세요" />
            
            <Input
               id="password"
               name="password"
               type="password"
               placeholder="비밀번호를 입력해주세요"
            />
            <Button>로그인</Button>
            </div>
        </Container>
        </Positioner>

    );
}

export default LoginForm;





















