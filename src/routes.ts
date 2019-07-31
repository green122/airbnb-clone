import { RouteProps } from "react-router-dom";

import App from "./App";
import { RentalList, RentalPage } from "./containers";
import Posts from "./features/Posts/Posts";

// interface IRoutes extends RouteProps {
//   path: string | undefined;
//   component: React.ComponentType;
//   exact: boolean;
// }
export const AppRoutes: RouteProps[] = [
  {
    path: "/",
    component: App,
    exact: true
  },
  {
    path: "/posts",
    component: Posts,
    exact: true
  },
  {
    path: "/rental/:id",
    component: RentalPage,
    exact: true
  },
  {
    path: "/rental",
    component: RentalList,
    exact: true
  },
];
