# Employee Salary Payment Automation Application

## Description:
This is a simple employee salary payment automation application that was built using Chainlink Keepers. Chainlink Keepers allow for smart contract automation which allows for the employer, in this case, to simply fund the contract with ETH and LINK to start automating salary payments in ETH to their desired employee on a biweekly basis.

## Website/Application: 
https://eth-salary-automation.vercel.app/

## How It Works:
1. Install Metamask and connect wallet to access application.
2. Enter details about employee's address, employee's salary amount (biweekly), and the Chainlink Keepers Registry address (Ethereum Mainnet).
3. Deploy contract and wait for the deployed contract's address to appear on the page.
4. Go to the Chainlink Keepers application and register the newly deployed contract's address with the registry.
5. Enter details about the Upkeep contract while funding it with some LINK.
6. Confirm the registration.
7. Fund contract with some ETH so salary payments can be automated on a biweekly basis.

### Frameworks/Languages Used:
* Solidity
* Hardhat
* Javascript
* Ethersjs
* React
* RemixIDE

### Note:
>Application was tested mainly using the RemixIDE on the Rinkeby/Goerli testnets. Smart contract can be editted to work for Ethereum testnets/networks as the Chainlink price feed ETH/USD address just needs to change.

### Built using Chainlink
This project utilizes Chainlink products such as Chainlink Keepers and Chainlink price feeds. For more information, visit [Chainlink](https://chain.link/).
