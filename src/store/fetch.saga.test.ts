import { AnyAction } from 'redux';
import { call, put } from 'redux-saga/effects';
import { createFetchSaga } from './fetch.saga';
import {FetchFunction, IFetchAction} from "../types/common";

describe('fetch saga', () => {
    const fetchsaga = createFetchSaga({});
    const fakeAction: IFetchAction = {
        type: 'FETCH',
        types: ['FETCH_START', 'FETCH_SUCCESS', 'FETCH_FAIL'],
        fetchFunction: () => ({}) as FetchFunction
    };
    it('should get result and dispatch success action', () => {
        const gen = fetchsaga(fakeAction);
        expect(gen.next().value).toEqual(put({ type: 'FETCH_START' }));
        expect(gen.next().value).toEqual(call(fakeAction.fetchFunction as any, { client: {}, payload: undefined }));
        const fakeResult = { data: [1, 2, 3] };
        expect(gen.next(fakeResult).value).toEqual(put({ type: 'FETCH_SUCCESS', payload: fakeResult }))
    });

    it('should dispatch fail action on error ', () => {
        const gen = fetchsaga(fakeAction);
        expect(gen.next().value).toEqual(put({ type: 'FETCH_START' }));
        expect(gen.next().value).toEqual(call(fakeAction.fetchFunction as any, { client: {}, payload: undefined }));
        expect(gen.throw && gen.throw({ error: 'error' }).value).toEqual(put({ type: 'FETCH_FAIL', error: { error: 'error' } }))
    });
});