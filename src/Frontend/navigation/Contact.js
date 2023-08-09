import React from 'react';

const Contact = () => (
<div class="contact-container">
  <form class="contact-form">

    <label for="fname">First Name</label>
    <input type="text" id="fname" name="firstname" placeholder="First Name"/>

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lastname" placeholder="last Name"/>

    <label for="email">E-mail</label>
    <input type="text" id="email" name="lastname" placeholder="E-mail"/>

    <label for="contact-type">Who You Are</label>
    <select id="contact-type" name="contact-type">
      <option value="user">User</option>
      <option value="industry">Industry</option>
      <option value="enterprise">Enterprise</option>
      <option value="acadamia">Academia</option>
    </select>

    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.."></textarea>

    <input class="contact-submit" type="submit" value="Submit"/>

  </form>
</div> 
);

export default Contact;
