import React from "react";

function Header() {
  const headerStyle = {
    fontFamily: "Roboto Mono, monospace", // Replace with the appropriate font for your hackathon project
    fontSize: "150px",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#5A10", // You can use any color or gradient for the background
    padding: "100px",
    textAlign: "center",
  };

  return (
    <div className="Header" style={headerStyle}>
      ChainSalary
    </div>
  );
}

export default Header;
