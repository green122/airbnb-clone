import React, { Dispatch, EffectCallback, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { navigateTo } from "../../+state/actions/navigator.actions";
import { fetchRentals, getRentals } from "../../+state/reducers/rental.reducer";
import { Rental } from "../../components";
import { IRental } from "../../types/models";

const ViewList = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface IRentalListProps {
  rentals: IRental[] | null,
  fetchRentals: EffectCallback
  goToRental:  (id: string) => () => void
}

function RentalListRaw(props: IRentalListProps) {
  useEffect(props.fetchRentals, []);
  const { rentals, goToRental } = props; 
  return (
    <ViewList>
      {rentals && rentals.map(rentalData => (
        <Rental
          key={rentalData._id}
          data={rentalData}
          onClick={goToRental(rentalData._id)}
        />
      ))}
    </ViewList>
  );
}

interface IDispatchProps  {
  fetchRentals: () => void;
  goToRental: (id: string) => () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any): IDispatchProps => {
  return {
    fetchRentals: () => {
      dispatch(fetchRentals());
    },
    goToRental: (id: string) => () => {
      dispatch(navigateTo(id));
    }
  };
};

const mapStateToProps = (state: any) => {
  return {
    rentals: getRentals(state)
  }
}

const RentalList = connect<any, IDispatchProps, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(RentalListRaw);

export { RentalList, RentalListRaw, IRentalListProps  };
