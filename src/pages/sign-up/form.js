import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "../../components/form/form-field";

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm;

const initials = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  verify_password: "",
  terms_condition_toggle: false,
};

const messages = {
  firstName: {
    required: "Fullname is required",
    length: "Name must have more than 1 character",
    alphabets: "Name must only contain alphabets",
  },
  email: {
    required: "Email is required",
    valid: "Invalid email",
  },
  password: {
    required: "Password is required",
    valid:
      "Password must have minimum eight characters, at least one letter and one number",
  },
  verify_password: {
    required: "Verify Password is required",
    valid: "Passwords must match",
  },
  terms_condition_toggle: {
    valid: "You must accept the terms and conditions",
  },
};

const SignUpForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [verifypasswordToggle, setVerifyPasswordToggle] = useState(false);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required(messages.firstName.required)
      .test("length", messages.firstName.length, (value) => {
        return value && value.length > 2;
      })
      .test("alphabets", messages.firstName.alphabets, (value) => {
        return /^[A-Za-z]+$/.test(value);
      }),
    email: Yup.string()
      .email(messages.email.valid)
      .required(messages.email.required),
    password: Yup.string()
      .matches(passwordRegEx, messages.password.valid)
      .required(messages.password.required),
    verify_password: Yup.string()
      .oneOf([Yup.ref("password"), null], messages.verify_password.valid)
      .required(messages.verify_password.required),
    terms_condition_toggle: Yup.boolean().oneOf(
      [true],
      messages.terms_condition_toggle.valid
    ),
  });

  return (
    <div className="right-part">
      <div className="landing-auth-link">
        <p className="text-right">
          Already a member?<a href="##">Sign In</a>
        </p>
      </div>

      <div className="landing-form-wrap">
        <div className="landing-form-inner">
          <div className="form-title">
            <h3>Sign Up</h3>
            <label>Let’s get started with Jur </label>
          </div>
          <Formik
            initialValues={initials}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setSubmitted(true);
              console.log(values);
              setTimeout(() => {
                setSubmitted(false);
              }, 1000);
            }}
          >
            {() => (
              <Form>
                <div className="form-group">
                  <div className="form-item">
                    <div className="input-item half">
                      <FormField name="first_name" label="Full Name" />
                    </div>
                    <div className="input-item half">
                      <FormField
                        name="last_name"
                        label="&nbsp;"
                        isRequired={false}
                      />
                    </div>
                  </div>
                  <FormField name="email" label="Email Address" />
                  <FormField
                    name="password"
                    type={passwordToggle ? "text" : "password"}
                    label="Password"
                    passwordShowComponent={
                      <em
                        className="pswd-toggle"
                        onClick={(e) => {
                          setPasswordToggle(!passwordToggle);
                        }}
                      >
                        {passwordToggle ? "Hide" : "Show"}
                      </em>
                    }
                  />
                  <FormField
                    name="verify_password"
                    type={verifypasswordToggle ? "text" : "password"}
                    label="Verify Password"
                    passwordShowComponent={
                      <em
                        className="pswd-toggle"
                        onClick={(e) => {
                          setVerifyPasswordToggle(!verifypasswordToggle);
                        }}
                      >
                        {verifypasswordToggle ? "Hide" : "Show"}
                      </em>
                    }
                  />
                  <FormField
                    name="terms_condition_toggle"
                    type="checkbox"
                    label={
                      <label htmlFor="check-one">
                        I agree to the <a href="##">terms</a> and{" "}
                        <a href="##">conditions</a>
                      </label>
                    }
                  />
                  <div className="form-item form-submit">
                    <button type="submit" disabled={submitted}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="landing-footer">
        <div className="landing-footer-inner">
          <p className="">Copyright ©2021 Product by Jur Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
