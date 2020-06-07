import { RouteProps } from "react-router-dom";

import App from "./App";
import { ListingEditor } from "./containers";

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
    path: "/listings/edit/:id?",
    component: ListingEditor,
  },
  {
    path: "/listings/modify/:entity/:entityId?",
    component: ListingEditor,
    exact: true
  }
];
