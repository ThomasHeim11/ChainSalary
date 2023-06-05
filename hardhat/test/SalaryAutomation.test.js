const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

// Chainlink Keeper Registry Address (Mainnet)
const KEEPER_ADDRESS = "0x7b3EC232b08BD7b4b3305BE0C044D907B2DF960B";
const NEW_KEEPER_ADDRESS = "0x02777053d6764996e594c3E88AF1D58D5363a2e6";

describe("Basic contract functionality test", function () {
  let ContractFactory;
  let contract;
  let owner;
  let employee1;
  let employee2;

  beforeEach(async function () {
    [owner, employee1, employee2] = await ethers.getSigners();
    ContractFactory = await ethers.getContractFactory("SalaryAutomation");
    contract = await ContractFactory.deploy(
      KEEPER_ADDRESS,
      500,
      employee1.address
    );
    await contract.deployed();
  });

  it("Check if state variables are correctly assigned", async function () {
    let ownerAddress = await contract.owner();
    expect(ownerAddress).to.equal(owner.address);

    let timeStamp = await contract.lastTimeStamp();
    expect(timeStamp).to.be.above(0);

    let keeperAddress = await contract.getKeeperRegistryAddress();
    expect(keeperAddress).to.equal(KEEPER_ADDRESS);

    let employeeAddress = await contract.getEmployee();
    expect(employeeAddress).to.equal(employee1.address);

    let salary = await contract.getEmployeeSalary();
    expect(salary).to.equal(500);
  });

  it("Successfully funds contract", async function () {
    await contract.fund({ value: parseEther("100") });

    let contractBalance = await ethers.provider.getBalance(contract.address);
    contractBalance = contractBalance / 1e18;
    expect(contractBalance).to.equal(100);
  });

  it("Allows owner to set the Keeper Registry Address", async function () {
    await contract.setKeeperRegistryAddress(NEW_KEEPER_ADDRESS);

    let keeperAddress = await contract.getKeeperRegistryAddress();
    expect(keeperAddress).to.equal(NEW_KEEPER_ADDRESS);
  });

  it("Allows owner to set the employee's salary", async function () {
    await contract.setEmployeeSalary(700);

    let salary = await contract.getEmployeeSalary();
    expect(salary).to.equal(700);
  });

  it("Allows owner to set the employee address", async function () {
    await contract.setEmployee(employee2.address);

    let employeeAddress = await contract.getEmployee();
    expect(employeeAddress).to.equal(employee2.address);
  });

  it("Allows owner to fund the contract", async function () {
    await contract.fund({ value: parseEther("200") });

    let contractBalance = await ethers.provider.getBalance(contract.address);
    contractBalance = contractBalance / 1e18;
    expect(contractBalance).to.equal(200);
  });

  it("Allows owner to withdraw the contract balance", async function () {
    await contract.fund({ value: parseEther("200") });

    let initialOwnerBalance = await ethers.provider.getBalance(owner.address);

    await contract.withdraw(parseEther("150"), owner.address);

    let newOwnerBalance = await ethers.provider.getBalance(owner.address);
    let contractBalance = await ethers.provider.getBalance(contract.address);

    initialOwnerBalance = parseFloat(
      ethers.utils.formatEther(initialOwnerBalance)
    );
    newOwnerBalance = parseFloat(ethers.utils.formatEther(newOwnerBalance));
    contractBalance = parseFloat(ethers.utils.formatEther(contractBalance));

    expect(initialOwnerBalance).to.be.lessThan(newOwnerBalance);
    expect(contractBalance).to.equal(50);
  });

  // Add more test cases for other functions if needed
});
