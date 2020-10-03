import { RouteProps } from "react-router-dom";

import { ListingEditor } from "./containers";
import {Listing} from "./containers/Listing/Listing";
import MainListings from "./containers/MainListings/MainListings";
import {SignUp} from "./containers/SignUp/SignUp";
import {SignIn} from "./containers/SignUp/SignIn";
import {withAuthCheck} from "./HOC/withAuthCheck";
import {Cart} from "./containers/Cart/Cart";

export const AppRoutes: RouteProps[] = [
  {
    path: "/",
    component: MainListings,
    exact: true
  },
  {
    path: "/listings/view/:id",
    component: Listing,
    exact: true
  },
  {
    path: "/listings/edit/:id?",
    component: withAuthCheck()(ListingEditor)
  },
  {
    path: "/signin",
    component: SignIn,
    exact: true
  },
  {
    path: "/signup",
    component: SignUp,
    exact: true
  },
  {
    path: "/listings/modify/:entity/:entityId?",
    component: ListingEditor,
    exact: true
  },
  {
    path: "/cart",
    component: Cart,
    exact: true
  }
];
