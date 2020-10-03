import React, { useEffect } from "react";
import { useAppDispatch } from "../../index";
import { fetchListings, getListings } from "../ListingEditor/Listing.store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GoodiesCard } from "../../components/Card/Card";
import { Link } from "react-router-dom";

const ListingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 24px;
`;

const MainListings = () => {
  const dispatch = useAppDispatch();
  const listings = useSelector(getListings);
  console.log(listings);
  useEffect(() => {
    dispatch(fetchListings());
  }, []);
  return (
    <ListingsContainer>
      {listings.map((listing) => (
        <Link to={`/listings/view/${listing.id}`}>
          <GoodiesCard
            image={listing.images[0]?.urlPreview}
            title={listing.name}
            subTitle={`from ${listing.from}`}
          />
        </Link>
      ))}
    </ListingsContainer>
  );
};

export default MainListings;
