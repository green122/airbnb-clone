import React from "react";
import styled from "styled-components";
import {Search} from '../../components';

const AppHeader = styled.header`
  background-color: #eeee;
  padding: 1rem;
  margin-bottom: 0.5em;
  color: white;
  display: flex;
`;

const HeaderText = styled.h1`
  color: black;
`;



export function Header() {
  return (
    <AppHeader>
      <HeaderText>My Super App</HeaderText>
      <Search/>
    </AppHeader>
  );
}
