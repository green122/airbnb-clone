import { shallow } from "enzyme";
import * as React from "react";
import fixtures from "../../+state/reducers/fixtures-big";
import { Rental } from "../../components";
import { IRental } from "../../types/models";
import { RentalListRaw } from "./RentalList";

// import * as ReactDOM from 'react-dom';

it("renders without crashing", () => {
  const spyFetch = jest.fn();
  const spyGoTo = jest.fn();
  spyFetch.mockImplementation(() => ({}));
  const wrapper = shallow(
    <RentalListRaw
      rentals={(fixtures as unknown) as IRental[]}
      fetchRentals={spyFetch}
      goToRental={spyGoTo}
    />
  );

  const rentalWrapper = wrapper.find(Rental);
  expect(rentalWrapper.length).toBe(5);
  rentalWrapper
    .first()
    .dive()
    .simulate("click");

  expect(spyGoTo).toHaveBeenCalledWith(fixtures[0]._id);
});
