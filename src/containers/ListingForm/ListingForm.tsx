import React from "react";
import {ICategory} from "types/models";
import {
  Dropdown,
  DropdownItemProps,
  Container,
  Button
} from "semantic-ui-react";
import {Field, FieldRenderProps, Form} from "react-final-form";
import {convertToDropdownItem} from "utils/convertToDropdown";
import ImageReaderField from "components/ImageReadingField/ImageReaderField";

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
          <form onSubmit={handleSubmit}>
            <Field name="category" validate={required}>
              {fieldData => (
                <DropdownWrapper fieldData={fieldData} options={options}/>
              )}
            </Field>
            <Field name="images">
              {({input}) => (
                <ImageReaderField
                  onChange={input.onChange}
                  value={input.value}
                />
              )}
            </Field>
            <Button type="submit">Create Listing</Button>
            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      />
    </Container>
  );
}

export default ListingForm;
