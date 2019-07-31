import { shallow } from "enzyme";
import * as React from "react";
import configureStore from "../../store/configureStore";
import { IRental } from "../../types/models";
import { Rental, View } from "./Rental";

// import * as ReactDOM from 'react-dom';

const testData = {
    images: {
      picture_url: "https://via.placeholder.com/200x100.png"
    },
    name: 'My title',
  }

it("renders without crashing", () => {
    const spyClick = jest.fn();
  const wrapper = shallow(
    <Rental data={testData as IRental} onClick={spyClick} />
  );  
  wrapper.find(View).simulate('click');
  expect(spyClick).toHaveBeenCalled();
});


describe('test with store', () => {
    const store = configureStore({});
    console.log(store);

})
