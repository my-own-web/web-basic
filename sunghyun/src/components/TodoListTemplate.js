import React from "react";
import styled from 'styled-components';
import PageTemplateBlock from "./PageTemplate";

const TodoListTemplate=({children})=>{
  return <PageTemplateBlock height='770px'>{children}</PageTemplateBlock>;
}

export default TodoListTemplate;

