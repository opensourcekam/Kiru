import * as React from "react";
import styled, { keyframes } from "styled-components";
import { withToastManager } from 'react-toast-notifications';
import { Formik, Form, Field, FieldProps,ErrorMessage } from "formik";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import FeatherIcon from 'feather-icons-react';
import { Inputs, Input } from "../styles/Input";
import { Buttons, Button, Instagram } from "../styles/Button";
import { parseGraphqlError } from "../../lib/parseGraphqlError";

const StyledText = styled.input`
  max-width: 300px;
`;

const REGISTER_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

interface Data {
  data: {
      register: {
      token: string
    };
  };
}

interface Variables {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
}

class RegisterMutation extends Mutation<Data, Variables> { }

const Register: React.SFC<any> = (props) => (
    <RegisterMutation mutation={REGISTER_MUTATION}>
      {(register: any, mutationProps: any) => (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordAgain: ""
          }}
          onSubmit={async (variables: Variables) => {   
            const { toastManager } = props;
            try {
              const response: Data = await register({
                variables
              });
  
              if (response.data.register.token) {
                window.localStorage.setItem('sid', response.data.register.token);
                props.history.push('/')
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
              <Field
                name="passwordAgain"
                render={({ field }: FieldProps<Variables>) => (
                  <>
                    <Input 
                      placeholder="Password Again"
                      type="password"
                      {...field}
                    />
                    <ErrorMessage
                      name="passwordAgain"
                      component="div"
                      className="field-error"
                    />
                  </>
                )}
                />
                </Inputs>
                <Buttons stretch={true}>
                  <Button  id="Register" type="submit"><FeatherIcon icon="arrow-right" /> Register</Button>
                  <StyledOr>OR</StyledOr>
                  <Instagram disabled={false}>
                    <span>
                        <FeatherIcon icon="instagram" />
                    </span>
                    Register with Instagram
                  </Instagram>
                </Buttons>
            </Form>
          )}
        />
      )}
    </RegisterMutation>
);

export default withRouter(withToastManager(Register));

const StyledOr = styled.span`
    text-align: center;
    display: block;
    min-width: 100%;
    margin: 0.5rem 0;
    font-size: 0.7rem;
    font-weight: 800;
`