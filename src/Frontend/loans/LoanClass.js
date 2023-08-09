import React, { Component, useState } from 'react';
import axios from 'axios';
import LoanCard from '../Util/LoanCard';

export default function loanClass(type) {
  const userEmail = () => {
    const value = `${document.cookie}`;
    const regex = /%22(.*)%22/g; // The actual regex
    const matches = regex.exec(value);
    const text = matches[1];
    const textArray = text.split('%22:%22');

    return textArray[1];
  };

  const loanType = type;

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
      .post('https://ajax-api-qzf9.onrender.com/' + id)
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
        <h1 className="heading">No loans available</h1>
      </div>
    );
  }
}

// import CanvasJSReact from '@canvasjs/react-charts';
// //var CanvasJSReact = require('@canvasjs/react-charts');

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// var dataPoints = [];
// class PersonalLoans extends Component {
//   render() {
//     const options = {
//       animationEnabled: true,
//       exportEnabled: true,
//       theme: 'light2', // "light1", "dark1", "dark2"
//       title: {
//         text: 'Bounce Rate by Week of Year',
//       },
//       axisY: {
//         title: 'Bounce Rate',
//         includeZero: false,
//         suffix: '%',
//       },
//       axisX: {
//         title: 'Week of Year',
//         prefix: 'W',
//         interval: 2,
//       },
//       data: [
//         {
//           type: 'line',
//           toolTipContent: 'Week {x}: {y}%',
//           dataPoints: [
//             { x: 1, y: 64 },
//             { x: 2, y: 61 },
//             { x: 3, y: 64 },
//             { x: 4, y: 62 },
//             { x: 5, y: 64 },
//             { x: 6, y: 60 },
//             { x: 7, y: 58 },
//             { x: 8, y: 59 },
//             { x: 9, y: 53 },
//             { x: 10, y: 54 },
//             { x: 11, y: 61 },
//             { x: 12, y: 60 },
//             { x: 13, y: 55 },
//             { x: 14, y: 60 },
//             { x: 15, y: 56 },
//             { x: 16, y: 60 },
//             { x: 17, y: 59.5 },
//             { x: 18, y: 63 },
//             { x: 19, y: 58 },
//             { x: 20, y: 54 },
//             { x: 21, y: 59 },
//             { x: 22, y: 64 },
//             { x: 23, y: 59 },
//           ],
//         },
//       ],
//     };

//     return (
//       <div>
//         <h1>React Line Chart</h1>
//         <CanvasJSChart
//           options={options}
//           /* onRef={ref => this.chart = ref} */
//         />
//         {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//       </div>
//     );
//   }
// }
