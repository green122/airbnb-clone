// import { IFetchAction } from "../../types/common";
import { IRental, IRentalState } from "../../types/models";

import { getRentalById, setRentalById } from './rental.reducer';


describe.only('set rental', () => {
    const fakeState: IRentalState=  {
        entities: null,
        detailedRentals: {},
        loading: false,
        loaded: false
    }
    const fakeRental =  {
        _id: 'test',
        name: 'testname'
    } as IRental;

    it('should set rental by id', () => {
        const newState = setRentalById({ state: fakeState, id: '000', rental: fakeRental});
        expect((newState.detailedRentals || {})['000']).toEqual(fakeRental);
    });
    it('should get rental by id', () => {
        const newState = setRentalById({ state: fakeState, id: '000', rental: fakeRental});
        const rental = getRentalById({rentals: newState}, '000');
        console.log('!!!!!!!!!!!!!', rental)
        expect(rental).toEqual(fakeRental);
    });
})


