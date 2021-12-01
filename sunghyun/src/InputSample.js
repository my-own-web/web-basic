import React, { useState, useRef } from "react";

function InputSample(){
  const [inputs, setInputs]=useState({
    name:'',
    nickname:''
  });

  const nameInput=useRef();

  const {name, nickname}=inputs;

  const handleChange=(e)=>{
    const {value, name}=e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  }

  const handleReset=()=>{
    setInputs({
      name:'',
      nickname: '',
    })
    nameInput.current.focus();
  }

  return (
    <div>
      <input name="name" placeholder="이름" onChange={handleChange} value={name} ref={nameInput}/>
      <input name="nickname" placeholder="별명" onChange={handleChange} value={nickname}/>
      <button onClick={handleReset}>초기화</button>
      <div>
        <b>값 :</b>
        {name}({nickname})
      </div>
    </div>
  )
}

export default InputSample;