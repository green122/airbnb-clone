import React, { useEffect } from "react";
import { useAppDispatch } from "../../index";
import {fetchCart, getCart, getCartTotal, updateCart} from "./Cart.store";
import { getCookie } from "../../utils/getCookie";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CartItem } from "../../components/CartItem/CartItem";
import { getVariationsState } from "../../components/Variation/Option.store";
import { fetchVariations } from "../../components/Variation/Variation.store";

const EmptyCard = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

export const Cart = () => {
  const dispatch = useAppDispatch();
  const cartId = getCookie("cartId");
  const cart = useSelector(getCart);
  const total = useSelector(getCartTotal);
  const variationState = useSelector(getVariationsState);

  useEffect(() => {
    if (!variationState.loaded) {
      dispatch(fetchVariations());
    }
  }, []);

  if (!cartId) {
    return <EmptyCard>Your Cart is empty</EmptyCard>;
  }
  return (
    <div>
      <p>{total}</p>
      {cart.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          item={cartItem}
          onChangeAmount={(amount) =>
            dispatch(updateCart({ listingId: cartItem.listing.id, amount }))
          }
          onChangeOption={(optionId, variationId) =>
            dispatch(
              updateCart({
                listingId: cartItem.listing.id,
                orderedItemId: cartItem.id,
                variationsOptions: [{ optionId, variationId }],
              })
            )
          }
        />
      ))}
    </div>
  );
};
