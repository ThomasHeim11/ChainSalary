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
      <li className="sm:text-sm md:text-base">Select "Custom logic" trigger</li>
      <li className="sm:text-sm md:text-base">
        Enter deployed contract address
      </li>
      <li className="sm:text-sm md:text-base">
        Enter Upkeep details including how much LINK to fund Upkeep with
      </li>
      <li className="sm:text-sm md:text-base">Confirm transaction</li>
      <li className="sm:text-sm md:text-base">
        Fund your Upkeep contract with ETH to automate future salary payments
      </li>
    </ol>
  );
}

export default NextSteps;
