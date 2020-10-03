import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ListingView } from "./ListingView";
import { fetchListing, getListing } from "../ListingEditor/Listing.store";
import { addToCart } from "../Cart/Cart.store";

export function Listing() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const listing = useSelector((state) => getListing(state, id));

  useEffect(() => {
    if (!listing) {
      dispatch(fetchListing(id));
    }
  }, [id, listing]);

  if (!listing) {
    return null;
  }
  console.log(listing);

  return (
    <div>
      <ListingView
        listing={listing}
        onSubmit={(submittedListing) => dispatch(addToCart(submittedListing))}
      />
    </div>
  );
}
