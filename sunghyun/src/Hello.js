import React, {Component} from 'react';

class Hello extends Component{
  render(){
    const {color, name, isSpecial}=this.props;
    return(
      <div style={{color}}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}!
      </div>
    )
  }
}

Hello.defaultProps={
  name:"처음 보는 사람"
}

export default Hello;