import { useSelector } from "react-redux";
import { getAuthState } from "../containers/SignUp/Auth.store";
import { useHistory, Redirect } from "react-router-dom";
import { parse } from "query-string";
import React, { ComponentType, FC } from "react";

export function withAuthCheck() {
  // if (!isLogged) {
  //   history.push(`/signin?redirectPath=${history.location.pathname}`);
  // }
  // if(isLogged) {
  //   const {redirectPath} = parse(history.location.search);
  //   console.log(redirectPath);
  //   if (redirectPath) {
  //     history.push(redirectPath as string);
  //   }
  // }
  return <P extends object>(Component: ComponentType<P>): FC<P> => (
    props: P
  ) => {
    const { isLogged, loadingCurrent, loaded } = useSelector((state) => getAuthState(state));
    const history = useHistory();
    console.log(history.location);

    return loadingCurrent || !loaded ? null : isLogged ? (
      <Component {...props} />
    ) : (
      <Redirect to={`/signin?redirectPath=${history.location.pathname}`} />
    );
  };
}
