import {IOption, IVariation} from "../../types/models";

export const UPDATE_OPTIONS_AND_VARIATION = 'UPDATE_OPTIONS_AND_VARIATION';

export function updateOptionsAndVariationAction(options: IOption[], variation: IVariation) {
  return {
    type: UPDATE_OPTIONS_AND_VARIATION,
    payload: {
      options,
      variation
    }
  }
}