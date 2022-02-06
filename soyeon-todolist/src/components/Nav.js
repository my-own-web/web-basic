import React from 'react';
import styled from 'styled-components';

const NavBlock = styled.div`
  display: block; /*가운데 정렬*/
  text-align: center; /*가운데 정렬*/
  margin: 0 auto;
  width: 512px;
  position: relative;
  background: #e9ecef;
  font-size: 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

function Nav({ children }) {
  return <NavBlock>{children}</NavBlock>;
}

export default Nav;