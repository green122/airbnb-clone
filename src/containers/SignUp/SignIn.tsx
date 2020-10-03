import React, { Fragment } from "react";

import { Field, Form } from "react-final-form";
import {Link, useHistory} from "react-router-dom";
import FaceBookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import {getAuthState, signUp} from "./Auth.store";
import { useAppDispatch } from "../../index";
import styled from "styled-components";
import {Button, Input} from "antd";
import {useAuthCheck} from "../../hooks/useAuthCheck";
import {useSelector} from "react-redux";

const Container = styled.div`
  width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const FieldWrapper = styled.section`
  margin-bottom: 15px;
`;

export const SignIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useAppDispatch();
  const {loading, loadingCurrent} = useSelector(getAuthState);
  useAuthCheck('login');

  const onSubmit = (values: typeof initialValues) => {};

  const facebookHandler = async (response: ReactFacebookLoginInfo) => {
    dispatch(signUp({ social: "facebook", accessToken: response.accessToken }));
  };

  const responseGoogle = async (response: GoogleLoginResponse) => {
    dispatch(signUp({ social: "google", accessToken: response.tokenId }));
  };

  if (loadingCurrent) {
    return null;
  }

  return (
    <Container>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <FieldWrapper>
              <label htmlFor="email">Email </label>
              <Field name="email">
                {({ input }) => <Input {...input} size="large" id="email" />}
              </Field>
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="password">Password</label>
              <Field name="password">
                {({ input }) => (
                  <Input
                    {...input}
                    size="large"
                    type="password"
                    id="password"
                  />
                )}
              </Field>
            </FieldWrapper>
            <Button htmlType="submit">Sign In</Button>
          </form>
        )}
      />
      <Link to="/signup">Registration</Link>
      <FaceBookLogin
        appId="958642267618042"
        autoLoad={false}
        fields="name,email,picture"
        callback={facebookHandler}
        cssClass="facebook-button"
        icon="fa-facebook"
      />
      <GoogleLogin
        clientId="1063114410911-slnaa91kka6ltodhegaf1jlkli51jqto.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={(props)=>(<Button {...props}>Enter with Google account</Button>)}
        cookiePolicy={"single_host_origin"}
      />
    </Container>
  );
};
