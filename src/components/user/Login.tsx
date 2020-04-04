import * as React from "react";
import * as Yup from 'yup';
import styled from "styled-components";
import { withToastManager } from 'react-toast-notifications';
import { Formik, Form, Field, FieldProps,ErrorMessage } from "formik";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import FeatherIcon from 'feather-icons-react';
import { Inputs, Input } from "../styles/Input";
import { Buttons, Button, Instagram } from "../styles/Button";
import { parseGraphqlError } from "../../lib/parseGraphqlError";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface Variables {
  email: string;
  password: string;
}

interface Data {
  data: {
      login: {
        token: string
    };
  };
}

const Login: React.SFC<any> = (props) => (
    <Mutation mutation={LOGIN_MUTATION}>
      {(login: any, mutationProps: any) => (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (variables: Variables) => {
            const { toastManager } = props;
            try {
              const response: Data = await login({
                variables
              });

              if (response.data.login.token) {
                window.localStorage.setItem('sid', response.data.login.token);
                props.history.push(`/`);
                mutationProps.client.writeData({ data: { isLoggedIn: true } });
              }
            } catch (error) {
              toastManager.add(parseGraphqlError(error), {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 4000
              });
            }
          }}
          render={() => (
            <Form>
              <Inputs stack={true} stretch={true}>
                <Field
                  name="email"
                  render={({ field }: FieldProps<Variables>) => (
                    <>
                      <Input 
                          placeholder="E-Mail address" 
                          type="email"
                          name="email"
                          {...field}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="field-error"
                      />
                    </>
                  )}
                />
                <Field
                  name="password"
                  render={({ field }: FieldProps<Variables>) => (
                    <>
                      <Input 
                          placeholder="Password" 
                          type="password"
                          name="password"
                          {...field}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="field-error"
                      />
                    </>
                  )}
                />
              </Inputs>
              <Buttons stretch={true}>
                <Button id="login" type="submit"><FeatherIcon icon="arrow-right" /> Sign in</Button>
                  <StyledOr>OR</StyledOr>
                  <Instagram disabled={false}>
                      <span>
                          <FeatherIcon icon="instagram" />
                      </span>
                      Sign In with Instagram
                  </Instagram>
                </Buttons>
            </Form>
          )}
        />
      )}
    </Mutation>
);

export default withRouter(withToastManager(Login));

const StyledOr = styled.span`
    text-align: center;
    display: block;
    min-width: 100%;
    margin: 0.5rem 0;
    font-size: 0.7rem;
    font-weight: 800;
`
