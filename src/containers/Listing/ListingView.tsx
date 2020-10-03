import React, {Fragment, useRef, useState} from 'react';
import styled from "styled-components";
import {IListing, ISubmittedListing, IVariation} from "../../types/models";
import {Form, Field, FormSpy} from "react-final-form";
import arrayMutators from 'final-form-arrays'
import {FieldArray} from "react-final-form-arrays";
import ListingImagesGallery from "../../components/ListingImagesGallery/ListingImagesGallery";
import {convertToDropdownItem} from "../../utils/convertToDropdown";
import {DropdownFormInput} from "../../components/DropdownFormInput/DropdownFormInput";

interface IListingViewProps {
  listing: IListing;
  onSubmit: (selectedListing: ISubmittedListing) => void;
}

const ListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
  margin: auto;
`

const ListingInfoContainer = styled.div`
  width: 400px;
`;

const ListingInfo = styled.p`
  font-size: 14px;
`

const ListingName = styled.p`
  font-size: 16px;
  font-weight: bold;
`

const FormStyled = styled.form`
`

const FieldContainer = styled.div`
  width: 400px;
  margin-bottom: 12px;
`

const FieldLabel = styled.p`
  margin-bottom: 5px;
`

const SubmitButton = styled.button`
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    background: #3e3e3e;
    color: antiquewhite;
    outline: none;
    text-decoration: none;
    border: none;
    border-radius: 5px;
`

export function getPrice(variation: IVariation, optionId?: number): number | undefined {
  const option = optionId ? variation.options.find(({id}) => id === optionId) : variation.options[0];
  return typeof option?.price === 'number' ? option?.price : option?.price?.value;
}

export function ListingView({listing, onSubmit}: IListingViewProps) {

  const {variations} = listing.category;
  const [price, setPrice] = useState(getPrice(variations[0]));

  const initialView: ISubmittedListing = {
    listingId: listing.id,
    amount: 1,
    variationsOptions: variations.map((variation) => ({
      variationId: variation.id,
      optionId: variation.options[0].id
    }))
  }

  const changeFieldListener = (index: number, value: any) => {
    const variation = listing.category.variations[index];
    if (!variation.varyPrice) {
      return;
    }
    setPrice(getPrice(variation, value) || 0)
  }

  return (
    <ListingContainer>
      <ListingImagesGallery images={listing.images}/>
      <ListingInfoContainer>
        {price && price > 0 && <p>Price: {price}</p>}
        <ListingName>{listing.name}</ListingName>
        <ListingInfo>{listing.description}</ListingInfo>
        <Form
          mutators={{
            // potentially other mutators could be merged here
            ...arrayMutators
          }}
          onSubmit={onSubmit}
          initialValues={initialView}
          render={({handleSubmit, form, values}) => (
            <div>
              <FormStyled>
                <FieldArray name="variationsOptions">
                  {({fields}) =>
                    fields.map((name, index) => (
                      <FieldContainer>
                        <FieldLabel>{variations[index].variation}</FieldLabel>
                        <Field name={`${name}.optionId`}>
                          {fieldData =>
                            <DropdownFormInput
                              fieldData={fieldData}
                              onChange={value => changeFieldListener(index, value)}
                              options={convertToDropdownItem(variations[index].options)}/>
                          }
                        </Field>
                      </FieldContainer>
                    ))
                  }
                </FieldArray>
                <SubmitButton  type="submit" onClick={handleSubmit}>Add to cart</SubmitButton>
                {/*{JSON.stringify(values)}*/}
              </FormStyled>
            </div>
          )}/>
      </ListingInfoContainer>
    </ListingContainer>
  );
};


