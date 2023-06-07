import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="Footer">
      <div className="FooterContent">
        <p className="FooterText Poppins" style={{ fontSize: "22px" }}>
          🔥🔥🔥MADE DURING CHAINLINK SPRING 2023 HACKATHON BY THOMAS HEIM🔥🔥🔥
        </p>
        <div className="FooterIcons">
          <div className="FooterIconContainer">
            <a
              className="FooterLink"
              href="https://github.com/ThomasHeim11/ChainSalary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="FooterIcon" />
              GitHub
            </a>
          </div>
          <div className="FooterIconContainer">
            <a
              className="FooterLink"
              href="https://www.linkedin.com/in/thomas-heim11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="FooterIcon" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
