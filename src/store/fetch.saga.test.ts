import { AnyAction } from 'redux';
import { createFetchSaga } from './fetch.saga';

describe('fetch saga', () => {
    const fetchsaga = createFetchSaga({});
    it('should get result', () => {
        const fakeAction: AnyAction = {
            type: 'FETCH',
            types: ['FETCH_START', 'FETCH_SUCCESS'],
            fetchFunction:  () => ({})
        }
        const gen = fetchsaga(fakeAction);
        
        console.log(gen.next());
        console.log(gen.next().value.payload.action);
        console.log(gen.next().value.payload.action);
        console.log(gen.next());
        
    })
});