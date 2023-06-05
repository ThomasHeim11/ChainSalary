// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title SalaryAutomation
 * @notice A contract for automating salary payments to an employee using Chainlink price feeds.
 * @dev Inherits from Pausable and KeeperCompatibleInterface contracts.
 */
contract SalaryAutomation is Pausable, KeeperCompatibleInterface {
    address public owner; // Address of contract owner
    address private keeperRegistryAddress; // Address of Keeper Registry
    address private employee; // Address of employee
    uint256 public lastTimeStamp; // Previous timestamp variable
    uint256 private salaryUsd; // Salary amount in USD
    AggregatorV3Interface internal priceFeed; // Interface for price feed

    
    event EmployeePaid(uint256 date);

    /**
     * @dev Chainlink Price Feed
     * Network: Sophia Testnet
     * Aggregator: ETH/USD
     * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     * @param _keeperRegistryAddress The address of the Keeper Registry contract
     * @param _salaryUsd The employee's salary amount in USD
     * @param _employee The address of the employee
     */
    constructor(
        address _keeperRegistryAddress,
        uint256 _salaryUsd,
        address _employee
    ) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        setKeeperRegistryAddress(_keeperRegistryAddress);
        setEmployeeSalary(_salaryUsd);
        setEmployee(_employee);
        lastTimeStamp = block.timestamp;
    }

    /**
     * @notice Fallback function allows contract to receive ETH.
     */
    receive() external payable {}

    /**
     * @notice Function modifier restricting access to owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    /**
     * @notice Function modifier restricting access to Keeper Registry
     */
    modifier onlyKeeperRegistry() {
        require(msg.sender == keeperRegistryAddress, "Not Keeper Registry");
        _;
    }

    /**
     * @notice Checks if upkeep is needed depending on time frame
     * @param performData Additional data for upkeep (unused in this implementation)
     * @return upkeepNeeded True if upkeep is needed, false otherwise
     */
    function checkUpkeep(
        bytes calldata performData
    )
        external
        view
        override
        whenNotPaused
        returns (bool upkeepNeeded, bytes memory)
    {
        require(address(this).balance > 0, "Insufficient funds");
        upkeepNeeded = (block.timestamp - lastTimeStamp) > 1209600; // Biweekly (14 days * 86400 seconds/day)
        return (upkeepNeeded, "");
    }

    /**
     * @notice Called by keeper to send ETH to employees
     * @param performData Additional data for upkeep (unused in this implementation)
     */
    function performUpkeep(
        bytes calldata performData
    ) external override onlyKeeperRegistry whenNotPaused {
        if ((block.timestamp - lastTimeStamp) > 1209600) {
            lastTimeStamp = block.timestamp;
            payEmployee();
        }
    }

    /**
     * @notice Pays employee in ETH
     */
    function payEmployee() private whenNotPaused {
        uint256 ethPrice = getEthPrice();
        uint256 ethAmount = (salaryUsd * 1e26) / ethPrice;

        (bool sent, ) = payable(employee).call{value: ethAmount}("");
        require(sent, "Failed to send Ether");

        emit EmployeePaid(block.timestamp);
    }

    /**
     * @notice Sets the Keeper Registry Address
     * @param _keeperRegistryAddress The address of the Keeper Registry contract
     */
    function setKeeperRegistryAddress(
        address _keeperRegistryAddress
    ) public onlyOwner {
        require(_keeperRegistryAddress != address(0), "Invalid address");
        keeperRegistryAddress = _keeperRegistryAddress;
    }

    /**
     * @notice Gets the Keeper Registry Address
     * @return The address of the Keeper Registry contract
     */
    function getKeeperRegistryAddress() public view returns (address) {
        return keeperRegistryAddress;
    }

    /**
     * @notice Sets the employee's salary
     * @param _salaryUsd The employee's salary amount in USD
     */
    function setEmployeeSalary(uint256 _salaryUsd) public onlyOwner {
        require(_salaryUsd > 0, "Salary <= 0");
        salaryUsd = _salaryUsd;
    }

    /**
     * @notice Gets the employee's salary
     * @return The employee's salary amount in USD
     */
    function getEmployeeSalary() public view onlyOwner returns (uint256) {
        return salaryUsd;
    }

    /**
     * @notice Sets the employee address
     * @param _employee The address of the employee
     */
    function setEmployee(address _employee) public onlyOwner {
        require(_employee != address(0), "Invalid address");
        employee = _employee;
    }

    /**
     * @notice Get the employee address
     * @return The address of the employee
     */
    function getEmployee() public view onlyOwner returns (address) {
        return employee;
    }

    /**
     * @notice Funds the contract with ETH
     */
    function fund() public payable onlyOwner {
        require(msg.value > 0, "Msg.value cannot be 0");
    }

    /**
     * @notice Pauses the contract, which prevents executing performUpkeep
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpauses the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Withdraws the contract balance
     * @param amount The amount of ETH (in wei) to withdraw
     * @param payee The address to pay
     */
    function withdraw(
        uint256 amount,
        address payable payee
    ) external onlyOwner {
        require(payee != address(0), "Invalid address");
        (bool sent, ) = payee.call{value: amount}("");
        require(sent, "Failed to withdraw Ether");
    }

    /**
     * @notice Gets the latest price of ETH from the Chainlink price feed
     * @return The latest price of ETH in USD
     */
    function getEthPrice() public view returns (uint256) {
        (, int256 _price, , , ) = priceFeed.latestRoundData();
        uint256 price = uint256(_price);
        return price;
    }
}
