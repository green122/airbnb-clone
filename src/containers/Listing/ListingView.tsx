import React, {Fragment} from 'react';
import {IListing, IVariation} from "../../types/models";
import {Form, Field} from "react-final-form";
import arrayMutators from 'final-form-arrays'
import {FieldArray} from "react-final-form-arrays";

interface IVariationOptions {
  variationId: number;
  optionId: number;
}

interface ISubmittedListing {
  listingId: number;
  variationsOptions: IVariationOptions[];
}

interface IListingViewProps {
  listing: IListing;
  onSubmit: (selectedListing: ISubmittedListing) => void;
}

export function ListingView({listing, onSubmit}: IListingViewProps) {

  const initialView = {
    amount: 0,
    variationOptions: listing.category.variations.map((variation) => ({variation: variation.id, option: ''}))
  }

  return (
    <div>
      <Form
        mutators={{
          // potentially other mutators could be merged here
          ...arrayMutators
        }}
        onSubmit={console.log}
        initialValues={initialView}
        render={({handleSubmit, values}) => (
          <Fragment>
          <FieldArray name="variationOptions">
            {({fields}) =>
              fields.map((name, index) => (
                <div>
                  <p>{listing.category.variations[index].variation}</p>
                  {listing.category.variations[index].options.map(option => (
                    <label>
                      <Field name={`${name}.option`} type="radio" component="input" value={String(option.id)}/>
                      {option.name}
                    </label>
                  ))}
                </div>
              ))
            }
          </FieldArray>
            {JSON.stringify(values)}
          </Fragment>
        )
        }
      />
    </div>
  );
};


