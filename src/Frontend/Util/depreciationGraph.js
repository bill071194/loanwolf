import React from 'react';
import CanvasJSReact from './@canvasjs/react-charts';

function PersonalLoansChart(props) {
  // // Declare a state variable and its corresponding setter function using the useState hook
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  let monthlyCanAfford = 0
  function setMonthlyCanAfford (amount) {
    if (isNaN(amount)) {
      monthlyCanAfford = 0;
      window.location.reload();
    } else {
      monthlyCanAfford = amount;
      window.location.reload();
    }
  }
  
    const setUpandAddData=(loans)=>{
    
      let all_loans_combined=[]
      let loan_one_month={month:0 , y:0, total_interest:0}

      let longest=0; // i++
      let loan_instance=0
      let counter=0
      loans.forEach(loan=>{
        if(loan.term >longest){
          longest=loan.term
          loan_instance=counter
        }
        counter+=1
      })
      console.log(loans)
      for(let i=0; i<loans[loan_instance].term; i++){ 
          all_loans_combined.push({...loan_one_month} )
      } 

      let previous_loan_amout=0
      counter=0
      loans.sort((a,b)=>b.amount-a.amount)
      let monthlyPayment=monthlyCanAfford

      loans.forEach(loan=>{
        loan_one_month={month:0 , y:0, total_interest:0}
        const x = 12/loan.compounding_period
        let monthCompoundedOn = 0
        if (Math.round(x)>1) {
          monthCompoundedOn = Math.round(x)
        } else {
          monthCompoundedOn = 2
        }
        let interest=0
        for(let month=0; month<loan.term ;month++){
          if( (month+1) % monthCompoundedOn ===0 ){ // interest is generated 
            interest= all_loans_combined[month-1].y *(loan.interest_rate/100/12) *monthCompoundedOn
            loan.amount+=interest
          }
          if(counter!==0){
              all_loans_combined[month].y =previous_loan_amout
          }
            all_loans_combined[month].month=month
            all_loans_combined[month].y+=loan.amount -monthlyPayment *month
            all_loans_combined[month].total_interest+=interest

              if(all_loans_combined[month].y <=0){
                break
              }
        }  
        previous_loan_amout+=loan.amount
        counter+=1        
      })
      // the loan compounding 

      all_loans_combined.forEach(loan=>{options.data[0].dataPoints.push(loan)})
  }

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    title: {
      // text: 'se the titile of the chart ',
      // text: 'se the titile of the chart ',
    },

    axisY: {
      title: 'Principle ',
      includeZero: false,
      prefix: '$',
    },

    axisX: {
      title: 'Months of Year',
      prefix: 'M',
      interval: 2,
    },

    data: [
      {
        type: 'line',
        toolTipContent: 'Month {month}: principle {y} interest {total_interest} ',
        dataPoints: [],
      },

    ],
    // let loan_one_month={month:0 , total_principle:0, total_interest:0}
  }

  return (
      <div class="chart">
        <h1 class="heading">Months to pay off {props.chartTitle} Loan</h1>
        <h4>Using monthly payments, compounding display of largest loan</h4>

        <div class="monthly-input">
          <label>How much can you afford monthly?</label>
          <input type="number" class="monthly-amount" id="amount" placeholder='25' required></input>
          <button type='submit' class="contact-submit"
          onClick={()=>{  
            setMonthlyCanAfford(document.getElementById("amount").value);
          }}
          >Update chart</button>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        {setUpandAddData(props.data) }
        {/* couldent figure out the card that goes with this -Afford monthly */}
        {/* change hard coded value on line 79  "let monthlyPayment=35" */}

        <CanvasJSChart options={options} />
     
      </div>
    );
}


export default PersonalLoansChart;