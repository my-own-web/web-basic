import React, {useReducer, createContext, useContext, useRef, useState} from 'react';

// (dbg) example infoss
export const infos = [{
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
