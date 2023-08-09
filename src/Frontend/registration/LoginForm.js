import React from 'react';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';

function LoginForm() {
  const [error, setError] = useState('');

  const signIn = useSignIn();

  const onSubmit = async values => {
    console.log('Values: ', values);
    setError('');

    try {
      const response = await axios.post(
        'https://ajax-api-qzf9.onrender.com/login',
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
      email: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="login-form">
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

          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p>{error}</p>}
          <label>
            <input type="checkbox" name="remember" />
            Remember me
          </label>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
