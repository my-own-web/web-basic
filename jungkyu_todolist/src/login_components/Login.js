import React, { Component } from 'react';
import styled from 'styled-components';
import Inputs from './Inputbox';


function Login() {

        return (
            <div>
                <h1>로그인</h1>
                <Inputs box="이메일" name="email" placeholder="이메일"/>
                <Inputs box="비밀번호" name="password" placeholder="비밀번호" type="password"/>
            </div>
        );
}

export default Login;