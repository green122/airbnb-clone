import React, {Fragment} from "react";
import {ICategory} from "types/models";
import {
  Dropdown,
  DropdownItemProps,
  Container,
  Input,
  TextArea,
  Form as FormUI,
  Button
} from "semantic-ui-react";
import {Field, FieldRenderProps, Form} from "react-final-form";
import {convertToDropdownItem} from "utils/convertToDropdown";
import ImageReaderField from "components/ImageReadingField/ImageReaderField";
import {Link} from "react-router-dom";

interface IListingFormProps {
  categories: ICategory[];
  submit: (rawResult: any) => void;
}

const required = (value: any) => (value ? undefined : "Required");

const DropdownWrapper = ({
                           fieldData,
                           options
                         }: {
  fieldData: FieldRenderProps<any, HTMLElement>;
  options: DropdownItemProps[];
}) => {
  const {onChange} = fieldData.input;
  const changeHandler = (_: any, {value}: { value: any }) => onChange(value);
  return (
    <Dropdown
      onChange={changeHandler}
      placeholder="Select category"
      value={fieldData.input.value}
      options={options}
      selection={true}
      fluid={true}
    />
  );
};

function ListingForm({categories, submit}: IListingFormProps) {
  const options = convertToDropdownItem(categories);
  return (
    <Container>
      <Form
        onSubmit={submit}
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
                  <DropdownWrapper fieldData={fieldData} options={options}/>
                </FormUI.Field>
              )}
            </Field>
            <Field name="images">
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
            <Button type="submit">Create Listing</Button>
            <pre>{JSON.stringify(values)}</pre>
          </FormUI>
        )}
      />
    </Container>
  );
}

export default ListingForm;
