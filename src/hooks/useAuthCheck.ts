import {useSelector} from "react-redux";
import {useHistory} from "react-router";
import {parse} from "query-string";
import {getAuthState} from "../containers/SignUp/Auth.store";

export function useAuthCheck(isLoginPage?: 'login') {
  const isLogged = useSelector(state => getAuthState(state).isLogged);
  const history = useHistory();
  console.log(history.location);
  if (!isLogged && !isLoginPage) {
    history.push(`/signin?redirectPath=${history.location.pathname}`)
  }
  if(isLogged && isLoginPage) {
    const {redirectPath} = parse(history.location.search);
    console.log(redirectPath);
    if (redirectPath) {
      history.push(redirectPath as string);
    }
  }
}
