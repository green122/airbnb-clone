import React, { FunctionComponent } from 'react';
import styl from 'react-emotion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Header, RentalList} from './containers';

import {Field} from './Field/Field'

const AppContainer = styled(`div`)({
  textAlign: 'center',
});



const ButtonLink = styl(Link)({
  ['button']: {
    backgroundColor: 'yellowgreen',
    border: 'none',
    borderRadius: '0.25em',
    fontSize: '1.25rem',
    padding: '0.25em 0.5em',
    color: 'white',
  },
  ['button:hover']: {
    cursor: 'pointer',
    backgroundColor: 'lightseagreen',
  },
});



const App: FunctionComponent = () => (
  <AppContainer>
    <Header/>
    <RentalList />
    <ButtonLink to="/posts">
      <button type="button">GET POSTS via Rest API</button>
    </ButtonLink>
    <Field />
  </AppContainer>
);

export default App;
