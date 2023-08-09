import React from 'react';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NewLoan() {
  const userEmail = () => {
    const value = `${document.cookie}`;
    const regex = /%22(.*)%22/g; // The actual regex
    const matches = regex.exec(value);
    const text = matches[1];
    const textArray = text.split('%22:%22');

    return textArray[1];
  };
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const onSubmit = async values => {
    console.log('Values: ', values);

    try {
      await axios.post('https://ajax-api-qzf9.onrender.com/newloan', values, {
        headers: { 'Access-Control-Allow-Origin': true },
      });
      navigate('/');
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log('Error: ', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: userEmail(),
      type: 'Personal',
      expense: 1,
      name: '',
      amount: '',
      interest_rate: '',
      term: '',
      compounding_period: '',
    },
    onSubmit,
  });

  return (
    <div className="loanf-container">
      <form className="loan-f" onSubmit={formik.handleSubmit}>
        <div className="loan-form">
          <label htmlFor="type">Loan or Investment Type</label>
          <select name="type" onChange={formik.handleChange} required>
            <option value="Personal">Personal Loan</option>
            <option value="Business">Business Loan</option>
            <option value="Car">Car Loan</option>
            <option value="Mortgage">Mortgage Loan</option>
            <option value="Consolidation">Consolidation Loan</option>
            <option value="Bond">Bond Investment</option>
            <option value="Stock">Stock Investment</option>
          </select>
          <label htmlFor="expense">Expense</label>
          <select name="expense" onChange={formik.handleChange} required>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
          <label htmlFor="name">Loan Name</label>
          <input
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Loan Name"
            name="name"
            required
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            placeholder="Amount"
            name="amount"
            required
          />
          <label htmlFor="interest_rate">Interest Rate</label>
          <input
            type="number"
            value={formik.values.interest_rate}
            onChange={formik.handleChange}
            placeholder="Interest Rate"
            name="interest_rate"
            required
          />
          <label htmlFor="term">Term</label>
          <input
            type="number"
            value={formik.values.term}
            onChange={formik.handleChange}
            placeholder="Term"
            name="term"
            required
          />
          <label htmlFor="compounding_period">Compounding Period</label>
          <input
            type="number"
            value={formik.values.compounding_period}
            onChange={formik.handleChange}
            placeholder="Compounding Period"
            name="compounding_period"
            required
          />

          <button type="submit" className="signup-button">
            Create Loan/Investment
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default NewLoan;
