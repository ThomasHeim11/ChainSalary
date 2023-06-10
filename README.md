# Employee Salary Payment Automation Application
<img width="1794" alt="image" src="https://github.com/ThomasHeim11/Web3-Project-/assets/106417552/528e1375-8674-43af-8eee-aff08dcd1fbd">


## Description:
ChainSalery is a employee salary payment automation application built using Chainlink Keepers. It leverages Chainlink's smart contract automation capabilities to automate salary payments in ETH to desired employees on a biweekly basis.

## Website/Application: 
https://chainsalary.surge.sh/

## Video Showcase
https://www.youtube.com/watch?v=wIJI0GYEtsw&t=201s

## How It Works:
1. Install Metamask and connect wallet to access application.
2. Enter details about employee's address, employee's salary amount (biweekly), and the Chainlink Keepers Registry address (Ethereum Mainnet).
3. Deploy contract and wait for the deployed contract's address to appear on the page.
4. Go to the Chainlink Keepers application and register the newly deployed contract's address with the registry.
5. Enter details about the Upkeep contract while funding it with some LINK.
6. Confirm the registration.
7. Fund contract with some ETH so salary payments can be automated on a biweekly basis.

## Smart Contract
The contract has the following features:

- The contract owner can set the Keeper Registry address, employee's salary amount in USD, and the employee's address.
- The contract uses the Chainlink price feed to get the latest price of ETH in USD.
- The contract implements the checkUpkeep and performUpkeep functions required by the KeeperCompatible interface. The checkUpkeep function checks if the upkeep is needed based on the time frame (biweekly in this case), and the performUpkeep function pays the employee if the required time has passed.
- The contract includes a fallback function to receive ETH.
- The contract provides functions to set and get the Keeper Registry address, employee's salary, and employee's address.
- The contract allows the contract owner to fund the contract with ETH, pause and unpause the contract, and withdraw the contract balance.
- Please note that the contract uses a specific Chainlink price feed contract address (0x694AA1769357215DE4FAC081bf1f309aDC325306) for the ETH/USD price on the Sepolia Testnet. You may need to update this address to the correct price feed address for the desired network.

### Frameworks/Languages Used:
* Solidity
* Hardhat
* Javascript
* Ethersjs
* React

### Built using Chainlink
This project utilizes Chainlink products such as Chainlink Keepers and Chainlink price feeds. For more information, visit [Chainlink](https://chain.link/).
