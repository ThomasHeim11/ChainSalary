import React from "react";

function NextSteps() {
  return (
    <ol className="NextStepsList">
      <li>
        Register deployed contract on{" "}
        <a
          className="DeployedLink"
          href="https://automation.chain.link/sepolia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chainlink Keepers Registry
        </a>
      </li>
      <li>Select "Custom logic" trigger</li>
      <li>Enter deployed contract address</li>
      <li>Enter Upkeep details including how much LINK to fund Upkeep with</li>
      <li>Confirm transaction</li>
      <li>
        Fund your Upkeep contract with ETH to automate future salary payments
      </li>
    </ol>
  );
}

export default NextSteps;
