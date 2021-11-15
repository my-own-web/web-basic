import React from 'react';

function Hello({color, name, isSpecial}){
  return (
    <div style={{color}}>
      {isSpecial && <b>*</b>}
      안녕하세요! {name}
    </div>
  );
}

Hello.defaultProps={
  name:"처음 보는 사람"
}

export default Hello;