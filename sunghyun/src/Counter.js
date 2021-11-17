import React, { Component } from "react";

class Counter extends Component{
  constructor(props) {
    super(props);
    this.state={
      counter:0
    }
  }

  handleIncrease=()=>{
    this.setState(state=>({
      counter:this.state.counter+1
    }));
  }

  handleDecrease=()=>{
    this.setState(state=>({
      counter:this.state.counter-1
    }));
  }

  render(){
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>increase</button>
        <button onClick={this.handleDecrease}>decrease</button>
      </div>
    )
  }
}

export default Counter;