import styled from "styled-components";

const PageTemplateBlock=styled.div`
  width:512px;
  height:${props=>props.height || '500px'};
  
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  
  margin: 96px auto 32px auto;
  display:flex;
  flex-direction: column;
`;

export default PageTemplateBlock;