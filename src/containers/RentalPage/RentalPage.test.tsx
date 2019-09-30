import { mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
// import fixtures from "../../+state/reducers/fixtures-big";
// import { Rental } from "../../components";
import configureStore from "../../store/configureStore";
// import { IRental, IRentalState } from "../../types/models";
// import { RentalListRaw } from "./RentalList";
import { RentalPage } from "./RentalPage";

describe("rental page", () => {
  const preloadedState = {
    rentals: {
      entities: null,
      detailedRentals: {
        test: {
          _id: "test",
          name: "testname"
        }
      },
      loading: false,
      loaded: false
    }
  };
  const store = configureStore({}, preloadedState);

  it.only("should get data correctly", () => {
    const fakematch = {
      params: {
        id: "test"
      }
    };
    const wrapper = mount(
      <Provider store={store}>
        <RentalPage match={fakematch} />
      </Provider>
    );
    console.log(wrapper)
  });
});
