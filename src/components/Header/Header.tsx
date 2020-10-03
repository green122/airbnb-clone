import React from "react";
import styled from "styled-components";
import { ShoppingCartOutlined, TrophyOutlined } from "@ant-design/icons/lib";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { getCart } from "../../containers/Cart/Cart.store";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  height: 75px;
  justify-content: space-between;
  border-bottom: 1px solid darkgray;
  padding: 24px;
  align-items: center;
`;

const StyledLogo = styled(TrophyOutlined)`
  font-size: 20px;
`;

const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 20px;
`;

export const Header: React.FC = () => {
  const cartItems = useSelector(getCart);
  return (
    <StyledHeader data-testid="Header">
      <Link to="/">
        <StyledLogo />
      </Link>
      <Link to="/cart">
        <Badge count={cartItems.length}>
          <CartIcon />
        </Badge>
      </Link>
    </StyledHeader>
  );
};
