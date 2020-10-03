import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IVariation, IVariationsState } from "../../types/models";
import {
  deleteVariationRoute,
  variationsRoute,
} from "../../constants/apiRoutes";
import { createSelector } from "reselect";
import { apiClient } from "../../utils/apiClient";
import create from "@ant-design/icons/lib/components/IconFont";

const initialState: IVariationsState = {
  entities: [],
  loading: false,
  loaded: false,
};

export const getVariationsState = (state: any): IVariationsState =>
  state.variations;
export const getVariations = createSelector(
  getVariationsState,
  (variationsState: IVariationsState) => {
    return variationsState.entities;
  }
);
export const getVariationById = createSelector(
  getVariations,
  (_: unknown, id: number) => id,
  (variations, id) => {
    const result = variations.find((variation) => variation.id === id);
    return result;
  }
);

export const fetchVariations = createAsyncThunk(
  "variations/fetch",
  async () => {
    const result = await apiClient().get<IVariation[]>(variationsRoute);
    return result.data;
  }
);

export const createVariation = createAsyncThunk(
  "variations/create",
  async (variation: IVariation) => {
    const result = await axios.post<IVariation>(variationsRoute, variation);
    return result.data;
  }
);

export const deleteVariation = createAsyncThunk(
  "variations/delete",
  async (id: number, { dispatch }) => {
    await axios.delete(deleteVariationRoute(id));
    dispatch(fetchVariations());
  }
);
// http://localhost:3000/#id_token=eyJraWQiOiJMWlFOMTl2a1MrMTlBMWdYZXVINUY3U1IrcG1mVG5ZWWk5b2tsMG43Y1lZPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoia1dHM2ptY1VNdE1EMFFZVGpSZWNKUSIsInN1YiI6IjRlMDg2NmQyLWEyNzQtNGEzYy04MDEzLTc3YmI0ODg5MzlkOCIsImF1ZCI6IjVqcWk5c2pkdmVmc3FnMTlhM3V2cm12dWdvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiZDhjNmNmMzctM2JkMy00MGMyLTkzODItOGQxYTJlYmQ5ZjM1IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTU4MzcwMDIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX3Vvc3hmZE0zdyIsImNvZ25pdG86dXNlcm5hbWUiOiJhbmRyZWkiLCJleHAiOjE1OTU4NDA2MDIsImlhdCI6MTU5NTgzNzAwMiwiZW1haWwiOiJncjEyMm5AZ21haWwuY29tIn0.V2w8x8iUsCIJJdB_gLMIZ3HvhsOiqFeh-hh527HAuG3--8Z2E7aKPBShmOvwe79fcu6tv3j7cj-u4ZDmMRayDa4prJlWa021P0bcqk4c7sjKZsv_HwSpex1mqaaoLrijDxPlpQOvzRGfe44Rwx6c9l3Gol3Dozdn0nFwjnIsgFYT1lU42kuBIDMuHDrCCWjsFlpVbtOg4_Bblf1gJkY8dNv6L1fxvt5k1wvSUxc_-NjEGlw58IhTkh7jNDNpfR-LGfCjk2KTyqjnIkZ4ORveYbr8Ilw22H2X-R4_q9qRBa6YNkDDKy9NyxtpjjTfM2Yk3BU6dzlVFQV9EppnRCphTQ&access_token=eyJraWQiOiJITUNlQm9SZUJWV1d3dFYzcGFsQjFtSHpSV3NHV2Jqb1dPQURkazBwY3lrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0ZTA4NjZkMi1hMjc0LTRhM2MtODAxMy03N2JiNDg4OTM5ZDgiLCJldmVudF9pZCI6ImQ4YzZjZjM3LTNiZDMtNDBjMi05MzgyLThkMWEyZWJkOWYzNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNTk1ODM3MDAyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV91b3N4ZmRNM3ciLCJleHAiOjE1OTU4NDA2MDIsImlhdCI6MTU5NTgzNzAwMiwidmVyc2lvbiI6MiwianRpIjoiMWU0MGU1MDctM2M0MC00ZjUyLTg1YzYtY2I0NGJkZDJhMzQ1IiwiY2xpZW50X2lkIjoiNWpxaTlzamR2ZWZzcWcxOWEzdXZybXZ1Z28iLCJ1c2VybmFtZSI6ImFuZHJlaSJ9.Bgi0b2KOJUQ0pcWBl7KNzTIPRd7xPhFYXHQ7pAnxj6jK9JHIDqvCDnpcUg6yS0k2DBcJDuz7SVsFt2adyM0DwJ0tbaPXU53OAiDz_ajce6fjGzmnL1TH_T7y0lH52b0NUjyfjHOUlaYWiCjemxaIu_B7wRN6HjSnRkPERBeqYZ8GtmintR55rz4n1O0NatzNj0s_BzHCQ0G9dgpoib1Wdho98r4Mx8PdSaA41DWRrJqtNXO3A9cXV9gSYi7OraS9g4D1hZ8lZrvEJouftqMsh23fgDax38tMNzYtQta2XQ38NGxx-AnYxXzVmhqRsKzO6TBZyBKQYkyzUgcGC9otkQ&expires_in=3600&token_type=Bearer
export const updateVariation = createAsyncThunk(
  "variations/update",
  async (variation: IVariation) => {
    await axios.put<IVariation>(variationsRoute, variation);
  }
);

const variationSlice = createSlice({
  name: "variation",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchVariations.fulfilled, (state, action) => {
        state.entities = (action.payload || []).sort((a, b) => a.id - b.id);
      })
      .addCase(createVariation.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.push(action.payload);
      })
      .addCase(updateVariation.fulfilled, (state) => {
        state.loading = false;
      }),
});

export const variationsReducer = variationSlice.reducer;
