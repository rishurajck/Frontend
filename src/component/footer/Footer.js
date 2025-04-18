import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer className="login-footer">
        <div className="footer-left">
          Have Questions?{" "}
          <a href="https://www.cloudkeeper.com/contact-us">Talk to our team</a>
        </div>
        <div className="footer-right">
          CloudKeeper 2025 | All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default Footer;
