import React from "react";

function Contact() {
  return (
    <div className="contact-container">
      <div className="signup-container">
        <form className="signup-form-container">
          <div className="signup-form-header">
            <h1>Contact Us</h1>
          </div>
          <div className="signup-input-container">
            <label>Username : </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="signup-input"
            />
          </div>
          <div className="signup-input-container">
            <label style={{ minWidth: "72px" }}>Mail : </label>
            <input
              type="text"
              placeholder="Enter Email "
              className="signup-input"
            />
          </div>
          <div className="signup-input-container">
            <label>Message : </label>
            <input
              type="text"
              placeholder="Enter Message "
              className="signup-input"
            />
          </div>
          <div className="signup-input-container">
            <button className="signup-submit-button">SEND</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
