import React from "react";

function Info() {
  return (
    <div className="Info">
      <p
        className="text-2xl font-bold mb-6"
        style={{ fontSize: "36px", fontWeight: "bold" }}
      >
        How It Works:
      </p>
      <ol className="list-decimal pl-8 mb-6">
        <li className="mb-2" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Install Metamask to use the app
        </li>
        <li className="mb-2" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Connect your Wallet (Ethereum Sopolia)
        </li>
        <li className="mb-2" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Input details on the employee (Biweekly payment schedule)
        </li>
        <li className="mb-2" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Deploy the Salary Automation contract
        </li>
        <li className="mb-2" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Register the contract with Chainlink Keeper Registry (requires funding
          with LINK)
        </li>
        <li className="mb-2" style={{ fontSize: "30px", fontWeight: "bold" }}>
          Enjoy automated salary payments for your employee
        </li>
      </ol>
    </div>
  );
}

export default Info;
