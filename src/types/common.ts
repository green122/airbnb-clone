export interface IFetchAction {
    types: string[];
    payload: any;
    fetchFunction({ client, payload} : {client: any, payload: any}): any;
}