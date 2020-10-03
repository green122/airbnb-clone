import { FieldRenderProps } from "react-final-form";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";
import React from "react";

interface DropdownFormInputProps extends DropdownProps {
  fieldData: FieldRenderProps<any, HTMLElement>;
  options: DropdownItemProps[];
  onChange?: (value: any) => void;
}

export const DropdownFormInput = ({
  fieldData,
  options,
  onChange,
  ...rest
}: DropdownFormInputProps) => {
  const changeHandler = (_: any, { value }: { value: any }) => {
    if (onChange) {
      onChange(value);
    }
      fieldData.input.onChange(value);
  };
  return (
    <Dropdown
      {...rest}
      onChange={changeHandler}
      value={fieldData.input.value}
      options={options}
      selection={true}
      fluid={true}
    />
  );
};
