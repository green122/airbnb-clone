import * as React from 'react';
import { shallow } from 'enzyme';
import * as ReactDOM from 'react-dom';

import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App/>);
  console.log(wrapper);
});
