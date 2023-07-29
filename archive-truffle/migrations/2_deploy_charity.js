const CharityContract = artifacts.require("Charity");

module.exports = async function (deployer) {
  // Deploy the contract
  await deployer.deploy(CharityContract);

  // You can also perform additional tasks after deployment, if needed

  // Example: Fetch the deployed contract instance
  const deployedContract = await CharityContract.deployed();
  console.log("Charity Contract deployed at:", deployedContract.address);
};
