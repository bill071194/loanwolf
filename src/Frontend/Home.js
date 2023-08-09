import React, { useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import LoanCard from './Util/LoanCard';
import { useNavigate } from 'react-router-dom';

const LoansDashboard = () => {
  const userEmail = () => {
    const value = `${document.cookie}`;
    const regex = /%22(.*)%22/g; // The actual regex
    const matches = regex.exec(value);
    const text = matches[1];
    const textArray = text.split('%22:%22');

    return textArray[1];
  };

  const [loans, setLoans] = useState([]);
  useState(() => {
    axios
      .get(`https://ajax-api-qzf9.onrender.com/${userEmail()}`)
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

  const hideLoan = (id) => {
    setLoans(loans.filter((loan) => loan._id !== id));
  }

  if (loans.length > 0) {
    return (
      <div className="homepage">
        <h1 className="heading">Welcome Back, {userEmail()}!</h1>
        <br />
        <h1 className="heading">Here are your loans and investments</h1>
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
                hide={hideLoan}
                name={oneLoan.name}
                amount={oneLoan.amount}
                interest_rate={oneLoan.interest_rate}
                due_in={oneLoan.term}
                life_time_cost={_amount}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="homepage">
        <h1 className="heading">Welcome Back, {userEmail()}!</h1>
        <br />
        <h1 className='heading' >You don't have any loans or investments</h1>
      </div>
    );
  }
};

function Home() {
  const navigate = useNavigate();
  
  const navigateLogin = () =>{
    navigate("/login");
  }

  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();

  if (auth) {
    return <LoansDashboard />;
  } else {
    return (
      <div className="about-container">
        <div class="about-section">
          <h1 className='heading'>Welcome to Loanwolf!</h1>
          <br/>
          <p>Loanwolf is a beautiful web applicaton that serves as a convenient solutions for users to keep track of their loans and investments.</p>
          <br/>
          <button type="button" class="get-started" onClick={navigateLogin}>Get Started</button>
        </div>

        <div class="row">

          {
            <Card 
            img= "/home1.png"
            title="Create an Account"
            dev= "Step 1"
            work="Create an account using our simple and intuitive register form"
          />
          }

        {
            <Card 
            img= "/home2.png"
            title="Create a New Loan or Investment"
            dev= "Step 2"
            work="Create a new loan or investment using the creation tool in the side navigation menu"
          />
          }

        {
            <Card 
            img= "/home3.png"
            title="Track Your Loan and Investment"
            dev= "Step 3"
            work="Track your loans and investments using information cards and a composite chart displaying the principal amount throughout its maturity period"
          />
          }
        </div>
      </div>
    );
  }
}

let Card=(prop)=>{
  return(
    <div class="about-column">
    <div class="about-card">
      <img class="about-img" src={prop.img} alt={prop.dev}/>
      <div class="about-container">
        <h2 class="about-heading">{prop.dev}</h2>
        <p class="title">{prop.title}</p>
        <p>{prop.work}</p>
      </div>
    </div>
  </div>
  )
}
export default Home;
