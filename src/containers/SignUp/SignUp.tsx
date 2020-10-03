import React from 'react';

import {Field, Form} from "react-final-form";
import {useAppDispatch} from "../../index";
import {signUp} from "./Auth.store";

export const SignUp = () => {
  const initialValues = {
    name: '',
    email: '',
    password: ''
  }

  const dispatch = useAppDispatch();

  const onSubmit = (values: typeof initialValues) => {
    dispatch(signUp(values));
  }

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} render={
      (({handleSubmit, form}) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" component="input"
                 type="text"
                 placeholder="Name"/>
          <Field name="email" component="input"
                 type="text"
                 placeholder="Email"/>
          <Field name="password" component="input"
                 type="password"
                 placeholder="Password"/>
          <button type="submit">
            Submit
          </button>
        </form>
      ))
    }/>

  );
};
