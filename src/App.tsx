import React, { FunctionComponent, useEffect } from "react";
import styl from "react-emotion";
import { Link, Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components/Header/Header";

import { Field } from "./Field/Field";
import { AppRoutes } from "./routes";
import { useAppDispatch } from "./index";
import { fetchCart } from "./containers/Cart/Cart.store";
import { getCookie } from "./utils/getCookie";
import { getCurrentUser } from "./containers/SignUp/Auth.store";
import "antd/dist/antd.css";

const AppContainer = styled(`div`)({
  textAlign: "center",
});

const ButtonLink = styl(Link)({
  ["button"]: {
    backgroundColor: "yellowgreen",
    border: "none",
    borderRadius: "0.25em",
    fontSize: "1.25rem",
    padding: "0.25em 0.5em",
    color: "white",
  },
  ["button:hover"]: {
    cursor: "pointer",
    backgroundColor: "lightseagreen",
  },
});

// const voidFunction = () => {return};
// const voidGoToFunction = (id: string) => () => {return};
window.onfocus = console.log;
const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (getCookie("cartId")) {
      dispatch(fetchCart());
    }
    dispatch(getCurrentUser());
  }, []);
  return (
    <>
      <Header />
      <Switch>
        {AppRoutes.map((route) => (
          <Route key={route.path as string} {...route} />
        ))}
      </Switch>
    </>
  );
};

export default App;
