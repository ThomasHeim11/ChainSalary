import React from "react";

function Info() {
  return (
    <div className="Info">
      <p className="text-2xl font-bold mb-6">How It Works:</p>
      <ol className="list-decimal pl-8 mb-6">
        <li className="mb-2">Install Metamask to use the app</li>
        <li className="mb-2">Connect your Wallet (Ethereum Sopolia)</li>
        <li className="mb-2">
          Input details on the employee (Biweekly payment schedule)
        </li>
        <li className="mb-2">Deploy the Salary Automation contract</li>
        <li className="mb-2">
          Register the contract with Chainlink Keeper Registry (requires funding
          with LINK)
        </li>
        <li className="mb-2">
          Enjoy automated salary payments for your employee
        </li>
      </ol>
    </div>
  );
}

export default Info;
