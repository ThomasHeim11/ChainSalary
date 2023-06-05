const { ethers, network, run } = require('hardhat');

async function main() {
  // Get the accounts from Hardhat
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy the SalaryAutomation contract
  const SalaryAutomation = await ethers.getContractFactory('SalaryAutomation');
  const salaryAutomation = await SalaryAutomation.deploy(
    '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
    1000,
    '0x71ACc14B71a8565C25B403Eb4C6B2C41B577E253'
  );

  await salaryAutomation.deployed();

  console.log('SalaryAutomation contract deployed to:', salaryAutomation.address);

  // Wait for enough block confirmations
  console.log('Waiting for block confirmations...');
  await salaryAutomation.deployTransaction.wait(6);
  console.log('Confirmed!');

  // Verify the contract on Etherscan
  const chainId = network.config.chainId;
  if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    console.log('Verifying contract...');
    try {
      await run('verify:verify', {
        address: salaryAutomation.address,
        constructorArguments: [
          '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
          1000,
          '0x71ACc14B71a8565C25B403Eb4C6B2C41B577E253',
        ],
      });
      console.log('Contract verified!');
    } catch (e) {
      if (e.message.toLowerCase().includes('already verified')) {
        console.log('Contract already verified!');
      } else {
        console.error(e);
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

