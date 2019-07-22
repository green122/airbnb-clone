import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { navigateTo } from "../../+state/actions/navigator.actions";
import fixtures from "../../+state/reducers/fixtures";
import { fetchRentals } from "../../+state/reducers/rental.reducer";
import { Rental } from "../../components";

const ViewList = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function RentalListRaw(props: any) {
  useEffect(props.fetchRentals, []);
  return (
    <ViewList>
      {fixtures.map(rentalData => (
        <Rental
          key={rentalData.id}
          image={rentalData.image}
          title={rentalData.title}
          subtitle={rentalData.description}
          onClick={props.goToRental(rentalData.id)}
        />
      ))}
    </ViewList>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any): any => {
  return {
    fetchRentals: () => {
      dispatch(fetchRentals());
    },
    goToRental: (id: string) => () => {
      dispatch(navigateTo(id));
    }
  };
};

const RentalList = connect(
  null,
  mapDispatchToProps
)(RentalListRaw);

export { RentalList };
