import React, {Fragment} from "react";
import {ICategory, IListing} from "types/models";
import {
  Container,
  Input,
  TextArea,
  Form as FormUI,
  Button
} from "semantic-ui-react";
import {Field, Form} from "react-final-form";
import {convertToDropdownItem} from "utils/convertToDropdown";
import ImageReaderField from "components/ImageReadingField/ImageReaderField";
import {Link} from "react-router-dom";
import {DropdownFormInput} from "../../components/DropdownFormInput/DropdownFormInput";

interface IListingFormProps {
  categories: ICategory[];
  editMode: boolean;
  listing: IListing;
  submit: (rawResult: any) => void;
}

const required = (value: any) => (value ? undefined : "Required");

function ListingForm({categories, listing, submit, editMode}: IListingFormProps) {
  const options = convertToDropdownItem(categories);
  const initialValues = {...listing, rawImages: listing?.images};
  return (
    <Container>
      <Form
        onSubmit={submit}
        initialValues={initialValues}
        render={({handleSubmit, form, values}) => (
          <FormUI onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({input, meta}) => (
                <FormUI.Field>
                  <label>Listing name</label>
                  <Input
                    onChange={input.onChange}
                    value={input.value}
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </FormUI.Field>
              )}
            </Field>
            <Field name="description" validate={required}>
              {({input, meta}) => (
                <FormUI.Field>
                  <label>Description</label>
                  <TextArea
                    onChange={input.onChange}
                    value={input.value}
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </FormUI.Field>
              )}
            </Field>
            <Field name="categoryId" validate={required}>
              {fieldData => (
                <FormUI.Field>
                  <label>Category</label>
                  <DropdownFormInput
                    placeholder="Select category"
                    fieldData={fieldData}
                    options={options}/>
                </FormUI.Field>
              )}
            </Field>
            <Field name="rawImages">
              {({input}) => (
                <FormUI.Field>
                  <label>Images</label>
                  <ImageReaderField
                    onChange={input.onChange}
                    value={input.value}
                  />
                </FormUI.Field>
              )}
            </Field>
            <Button><Link to="/listings/modify/categories">Edit Categories</Link></Button>
            <Button><Link to="/listings/modify/variations">Edit Variations</Link></Button>
            <Button type="submit">{editMode ? 'Update Listing' : 'Create Listing'}</Button>
            <pre>{JSON.stringify(values)}</pre>
          </FormUI>
        )}
      />
    </Container>
  );
}

export default ListingForm;
