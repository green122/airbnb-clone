import { shallow } from 'enzyme';
import * as React from 'react';
// import * as ReactDOM from 'react-dom';

import App from './App';

it('renders without crashing', () => {
  shallow(<App/>);  
});
