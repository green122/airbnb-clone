import { AnyAction } from "redux";
import { AxiosStatic } from "axios";

export interface IFetchAction extends AnyAction {
  types: string[];
  payload?: any;
  fetchFunction({
    client,
    payload
  }: {
    client: AxiosStatic;
    payload: any;
  }): any;
}
