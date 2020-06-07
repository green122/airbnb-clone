import {AnyAction} from "redux";
import {AxiosStatic} from "axios";
import {IStore} from "../+state/reducers";

export type FetchFunction = ({client, payload}: {
  client: AxiosStatic;
  payload: any;
}) => any;


export interface IFetchAction extends AnyAction {
  types: string[];
  payload?: any;

  fetchFunction: FetchFunction;
  checkIsLoaded?(state: IStore): boolean;

}
