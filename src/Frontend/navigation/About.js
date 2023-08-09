import React from 'react';

let Card=(prop)=>{
  return(
    <div class="about-column">
    <div class="about-card">
      <img class="about-img" src={prop.img} alt={prop.dev}/>
      <div class="about-container">
        <h2 class="about-heading">{prop.dev}</h2>
        <p class="title">{prop.title}</p>
        <p>{prop.work}</p>
        <p class="about-desc">{prop.dev}@loanwolf.com</p>
      </div>
    </div>
  </div>
  )
}

const About = () => (
  <div className="about-container">
    <div class="about-section">
      <h1>About the Loanwolf Team</h1>
      <p>Loanwolf is a team of passionate developers aim to develop a convenient solutions for users to keep track of their loans and investments.</p>
    </div>

    <h2 class="about-heading">Our Team</h2>
    <div class="row">

      {
        <Card 
        img= "/Bill.jpg"
        title="Back End Developer"
        dev= "Bill"
        work="Bill is a passionate software engineer who specializes in server-side engineering."
      />
      }

    {
        <Card 
        img= "./cristi.jpg"
        title="Database Engineer and Loans Specialist"
        dev= "Cristi"
        work="Cristi is a visionary loans specialist who brought the idea to life and managed the databases."
      />
      }

    {
        <Card 
        img= "/yigit.jpg"
        title="Front End Developer"
        dev= "Yigit"
        work="Yigit is Loanwolf's client-side wizard who is responsible for beautiful UIs and intuitive user experience."
      />
      }
    </div>
  </div>
);

export default About;

//   <div class="about-column">
//     <div class="about-card">
//       <img class="about-img" src="/Bill.jpg" alt="Bill"/>
//       <div class="about-container">
//         <h2 class="about-heading">Bill</h2>
//         <p class="title">Back End Developer</p>
//         <p>Bill is a passionate software engineer who specializes in server-side engineering.</p>
//         <p class="about-desc">bill@loanwolf.com</p>
//       </div>
//     </div>
//   </div>

//   <div class="about-column">
//     <div class="about-card">
//       <img class="about-img" src="/Bill.jpg" alt="Bill"/>
//       <div class="about-container">
//         <h2 class="about-heading">Cristi</h2>
//         <p class="title">Database Engineer and Loans Specialist</p>
//         <p>Cristi is a visionary loans specialist who brought the idea to life and managed the databases.</p>
//         <p class="about-desc">cristi@loanwolf.com</p>
//       </div>
//     </div>
//   </div>

//   <div class="about-column">
//     <div class="about-card">
//       <img class="about-img" src="/Bill.jpg" alt="Bill"/>
//       <div class="about-container">
//         <h2 class="about-heading">Yigit</h2>
//         <p class="title">Front End Developer</p>
//         <p>Yigit is Loanwolf's client-side wizard who is responsible for beautiful UIs and intuitive user experience.</p>
//         <p class="about-desc">yigit@loanwolf.com</p>
//       </div>
//     </div>
//   </div>
// </div>