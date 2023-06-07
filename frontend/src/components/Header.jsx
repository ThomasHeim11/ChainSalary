import React from "react";

function Header() {
  const headerStyle = {
    fontFamily: "Courier New, monospace",
    fontSize: "150px",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#5A10",
    padding: "110px",
    textAlign: "center",
  };

  return (
    <div className="Header" style={headerStyle}>
      ChainSalary
    </div>
  );
}

export default Header;
