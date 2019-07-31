import { AnyAction } from "redux";

export interface IFetchAction extends AnyAction {
    types: string[];
    payload: any;
    fetchFunction({ client, payload} : {client: any, payload: any}): any;
}