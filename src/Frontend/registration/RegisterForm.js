import React from 'react';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';

function RegisterForm() {
  const [error, setError] = useState('');
  const signIn = useSignIn();
  const onSubmit = async values => {
    console.log('Values: ', values);
    setError('');

    try {
      const response = await axios.post(
        'https://ajax-api-qzf9.onrender.com/register',
        values,
        {
          headers: { 'Access-Control-Allow-Origin': true },
        }
      );
      signIn({
        token: response.data.token,
        expiresIn: 1440, //cookie expires after 1 day
        tokenType: 'Bearer',
        authState: { email: values.email },
      });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log('Error: ', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      first: '',
      last: '',
      email: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="signup-form">
          <label htmlFor="first">First Name</label>
          <input
            type="text"
            value={formik.values.fname}
            onChange={formik.handleChange}
            placeholder="First Name"
            name="first"
            required
          />
          <label htmlFor="last">Last Name</label>
          <input
            type="text"
            value={formik.values.lname}
            onChange={formik.handleChange}
            placeholder="Last Name"
            name="last"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            name="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            name="password"
            required
          />

          <button type="submit" className="signup-button">
            Register
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
