import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import User from "./User";

const membersApi = "https://reqres.in/api/users";

const OnboardingForm = () => {
  const [users, setUsers] = useState([{}]);
  const initialMemberForm = {
    name: "",
    email: "",
    password: ""
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
  });

  const handleFormSubmit = (userData, actions) => {
    // e.preventDefault();
    const newMember = {
      name: userData.name,
      email: userData.email,
      password: userData.password
    };

    axios
      .post(membersApi, newMember)
      .then(res => {
        let newUser = res.data;
        setUsers([...users, newUser]);
        console.log(res.data);
        actions.resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const validateForm = userData => {
    const errors = {};

    if (!userData.name) {
      errors.name = "Name field is required";
    } else if (userData.name.length <= 2) {
      errors.name = "Name must be more than two characters";
    }

    if (!userData.email) {
      errors.email = "Email field is required";
    }

    if (!userData.password) {
      errors.password = "Password field is required";
    } else if (userData.password.length < 6) {
      errors.password = "Password is too short";
    }

    return errors;
  };

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        validate={validateForm}
        initialValues={initialMemberForm}
        onSubmit={handleFormSubmit}
        render={props => {
          return (
            <Form>
              <div>
                <label>
                  Name
                  <Field name="name" type="text" placeholder="Name" />
                  <ErrorMessage name="name" component="div" />
                </label>
              </div>

              <div>
                <label>
                  Email
                  <Field name="email" type="email" placeholder="Email" />
                  <ErrorMessage name="email" component="div" />
                </label>
              </div>

              <div>
                <label>
                  Password
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" />
                </label>
              </div>

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      />
      <User users={users} />
    </div>
  );
};

export default OnboardingForm;
