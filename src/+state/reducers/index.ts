import { combineReducers, Reducer } from 'redux';

import { IPostsStoreState, IRentalState } from '../../types/models';
import postsReducer from './posts.reducer';
import {rentalReducer} from './rental.reducer';

export interface IStoreState {
    posts: IPostsStoreState,
    rentals: IRentalState
}

type ReducerMaps = { [K in keyof IStoreState]: Reducer<any> };

const allReducers: ReducerMaps = {
    posts: postsReducer,
    rentals: rentalReducer
};

const rootReducer = combineReducers({...allReducers});

export default rootReducer;