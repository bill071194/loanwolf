import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={`side-nav ${isOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="close-btn" onClick={closeNav}>
          {' '}
          &times;{' '}
        </a>
        <ul className="menu-links">
          <li>
            <NavLink to="/personal-loans">Personal Loans</NavLink>
          </li>
          <li>
            <NavLink to="/business-loans">Business Loans</NavLink>
          </li>
          <li>
            <NavLink to="/car-loans">Car Loans</NavLink>
          </li>
          <li>
            <NavLink to="/mortgage-loans">Mortgage Loans</NavLink>
          </li>
          <li>
            <NavLink to="/consolidation-loans">Consolidation Loans</NavLink>
          </li>
          <br />
          <hr />
          <li>
            <NavLink to="/bond-investments">Bond Investments</NavLink>
          </li>
          <li>
            <NavLink to="/stock-investments">Stock Investments</NavLink>
          </li>
          <br />
          <hr />
          <li>
            <NavLink to="/newloan">+ Create New Loan or Investment</NavLink>
          </li>
        </ul>
      </div>

      <div>
        <span className="open-btn" onClick={openNav}>
          {' '}
          &#9776;
        </span>
      </div>
    </div>
  );
};

export default Navigation;
