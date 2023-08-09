import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import About from './navigation/About';
import Contact from './navigation/Contact';
import Support from './navigation/Support';

import LoginForm from './registration/LoginForm';
import RegisterForm from './registration/RegisterForm';

import PersonalLoans from './loans/PersonalLoans';
import CarLoans from './loans/CarLoans';
import BusinessLoans from './loans/BusinessLoans';
import MortgageLoans from './loans/MortgageLoans';
import ConsolidationLoans from './loans/ConsolidationLoans';
import BondInvestments from './loans/BondInvestments';
import StockInvestments from './loans/StockInvestments';
import NewLoan from './loans/NewLoan';
import UpdateLoan from './loans/UpdateLoan';

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Component /> : <Navigate to="/login" />;
};

const LoggedIn = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Navigate to="/" /> : <Component />;
};

const App = () => (
  <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<LoggedIn Component={LoginForm} />} />
          <Route
            path="/register"
            element={<LoggedIn Component={RegisterForm} />}
          />
          <Route
            path="/personal-loans"
            element={<PrivateRoute Component={PersonalLoans} />}
          />
          <Route
            path="/car-loans"
            element={<PrivateRoute Component={CarLoans} />}
          />
          <Route
            path="/business-loans"
            element={<PrivateRoute Component={BusinessLoans} />}
          />
          <Route
            path="/mortgage-loans"
            element={<PrivateRoute Component={MortgageLoans} />}
          />
          <Route
            path="/consolidation-loans"
            element={<PrivateRoute Component={ConsolidationLoans} />}
          />
          <Route
            path="/bond-investments"
            element={<PrivateRoute Component={BondInvestments} />}
          />
          <Route
            path="/stock-investments"
            element={<PrivateRoute Component={StockInvestments} />}
          />
          <Route
            path="/newloan"
            element={<PrivateRoute Component={NewLoan} />}
          />
          <Route
            path="/:id"
            element={<PrivateRoute Component={UpdateLoan} />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
