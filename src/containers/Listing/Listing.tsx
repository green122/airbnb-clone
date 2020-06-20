import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import {fetchListing, getListing} from "../../+state/reducers/listing.reducer";
import {ListingView} from "./ListingView";

export function Listing() {

  const {id} = useParams();
  const dispatch = useDispatch();
  const listing = useSelector(state => getListing(state, id));

  console.log(listing);

  useEffect(() => {
    if (!listing) {
      dispatch(fetchListing(id))
    }
  }, [id, listing]);

  if (!listing) {
    return null
  }
  console.log(listing);

  return (
    <div>
      <ListingView listing={listing} onSubmit={console.log} />
    </div>
  );
};

