import React from "react";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";

const Main = () => {
  return (
    <>
      <TodoHead />
      <TodoList />
      <TodoCreate />
    </>
  );
};

export default Main;
