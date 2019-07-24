import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
console.log('object');
Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {}
  };
};
