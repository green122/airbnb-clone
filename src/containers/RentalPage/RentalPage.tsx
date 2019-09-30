import React, { useEffect } from "react";
import { useDispatch, useStore } from 'react-redux';
import { fetchRentalById, getRentalById } from '../../+state/reducers/rental.reducer';

interface IRentalPageProps {
  match: {
    params: {
      id: string;
    }
  }
}

export function RentalPage(props: IRentalPageProps) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const store = useStore().getState();
  const rental = getRentalById(store, id);
  console.log(rental);
    useEffect(() => {
    dispatch(fetchRentalById(id));
  }, [id]);
  return <div />;
}
