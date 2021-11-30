import React, {useReducer, createContext, useContext, useRef, useState} from 'react';

// (dbg) example info
export const info = [{
    id: 'id',
    password: 'password',
    login: false
},
{
    id: 'jieun',
    password: 'kwon',
    login: false
},
{
    id: 'a',
    password: 'b',
    login: false
}];

// const LoginContext = createContext();

// export function LoginContext(){
//     const [valid, setValid] = useState(false);
// }
