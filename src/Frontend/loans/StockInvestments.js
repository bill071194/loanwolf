import React, { Component, useState } from 'react';
import axios from 'axios';
import LoanCard from '../Util/LoanCard';

function StockInvestments() {
  const userEmail = () => {
    const value = `${document.cookie}`;
    const regex = /%22(.*)%22/g; // The actual regex
    const matches = regex.exec(value);
    const text = matches[1];
    const textArray = text.split('%22:%22');

    return textArray[1];
  };

  const loanType = 'Stock';

  const url = `https://ajax-api-qzf9.onrender.com/${loanType}/${userEmail()}`;

  const [loans, setLoans] = useState([]);
  useState(() => {
    axios
      .get(url)
      .then(res => {
        setLoans(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteLoan = id => {
    axios
      .delete('https://ajax-api-qzf9.onrender.com/' + id)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    setLoans(loans.filter(loan => loan._id !== id));
  };

  const editLoan = id => {
    window.location = '/' + id;
  };

  if (loans.length > 0) {
    return (
      <div>
        {loans.map(oneLoan => {
          let _amount = Math.round(
            (oneLoan.interest_rate / 100 / 12) *
              oneLoan.compounding_period *
              oneLoan.amount +
              oneLoan.amount
          );

          return (
            <LoanCard
              id={oneLoan._id}
              edit={editLoan}
              delete={deleteLoan}
              name={oneLoan.name}
              amount={oneLoan.amount}
              interest_rate={oneLoan.interest_rate}
              due_in={oneLoan.term}
              life_time_cost={_amount}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="heading">No investments available</h1>
      </div>
    );
  }
}

export default StockInvestments;
