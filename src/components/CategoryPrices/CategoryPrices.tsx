import React from "react";
import { IOption } from "types/models";
import { Button } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import "./CategoryPrices.css";
import clone from "ramda/es/clone";

interface ICategoryPricesProps {
  options: IOption[];
  handleSubmitOptions: (options: IOption[]) => void;
}

function CategoryPrices({
  options,
  handleSubmitOptions
}: ICategoryPricesProps) {
  const onSubmit = (values: any) => {
    const newOptions = clone(options);
    Object.keys(values).forEach(key => {
      const index = Number(key.slice(4));
      newOptions[index].price = Number(values[key]);
    });
    handleSubmitOptions(newOptions);
  };
  const initialValues = options.reduce((acc, current, index) => {
    const key = "key_" + index.toString();
    acc[key] = current.price;
    return acc;
  }, {});

  return (
    options && (
      <div className="options-list">
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={validatePriceForm}
          render={({ handleSubmit, values, errors }) => (
            <form onSubmit={handleSubmit}>
              {options.map((option, index) => (
                <div key={option.id} className="option-item">
                  <div className="option-content">{option.name}</div>
                  <div className="option-content--right">
                    <span>Price</span>
                    <Field name={"key_" + index.toString()} component="input">
                      {({ input, meta }) => {
                        return (
                          <div>
                            <input
                              className="price_input"
                              {...input}
                              type="text"
                            />{" "}
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        );
                      }}
                    </Field>
                  </div>
                </div>
              ))}
              <Button type="submit">Update prices</Button>
            </form>
          )}
        />
      </div>
    )
  );
}

export function validatePriceForm(values: { [key: string]: string }) {
  const errors = {};
  Object.keys(values).forEach(key => {
    if (!values[key]) {
      errors[key] = "Required";
    }
  });
  return errors;
}

export default CategoryPrices;
