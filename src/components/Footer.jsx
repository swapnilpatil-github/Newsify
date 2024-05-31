// Footer.js
import React from "react";
import "./styles/Footer.css"; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">
              <h2>
                <p>
                  © {new Date().getFullYear()} React News App. All rights
                  reserved.
                </p>
              </h2>
             <h4>Contact us</h4>
              <a
                href="https://github.com/swapnilpatil-github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>@GitHub</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
