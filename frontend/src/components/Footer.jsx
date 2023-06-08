import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="Footer bg-gray-800 py-4">
      <div className="FooterContent flex flex-col items-center justify-center">
        <p className="FooterText text-white text-lg mb-2">
          🔥🔥🔥 MADE DURING CHAINLINK SPRING 2023 HACKATHON BY THOMAS HEIM
          🔥🔥🔥
        </p>
        <div className="FooterIcons flex items-center justify-center">
          <div className="FooterIconContainer mx-4">
            <a
              className="FooterLink flex items-center text-white"
              href="https://github.com/ThomasHeim11/ChainSalary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                className="FooterIcon mr-1"
                style={{ fontSize: "24px", color: "white" }}
              />
              <span style={{ fontSize: "18px", color: "white" }}>GitHub</span>
            </a>
          </div>
          <div className="FooterIconContainer mx-4">
            <a
              className="FooterLink flex items-center text-white"
              href="https://www.linkedin.com/in/thomas-heim11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className="FooterIcon mr-1"
                style={{ fontSize: "24px", color: "white" }}
              />
              <span style={{ fontSize: "18px", color: "white" }}>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
