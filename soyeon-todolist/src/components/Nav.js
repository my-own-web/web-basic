import React from 'react';
import styled from 'styled-components';

const NavBlock = styled.div`
  display: inline-flex;
  margin: 0 auto;
  width: 512px;
  position: relative;
  background: green;
  font-size: 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

function Nav({ children }) {
  return <NavBlock>{children}</NavBlock>;
}

export default Nav;