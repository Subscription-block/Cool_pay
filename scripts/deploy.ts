import { ethers } from "hardhat";

async function main() {
  console.log("Starting CoolBank deployment...");

  // Get the ContractFactory and Signers here
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)));

  // Deploy the contract
  const CoolBank = await ethers.getContractFactory("CoolBank");
  const coolBank = await CoolBank.deploy();

  await coolBank.waitForDeployment();

  const contractAddress = await coolBank.getAddress();
  
  console.log("CoolBank deployed to:", contractAddress);
  console.log("Transaction hash:", coolBank.deploymentTransaction()?.hash);
  
  // Verify the deployment
  console.log("Verifying deployment...");
  const owner = await coolBank.owner();
  console.log("Contract owner:", owner);
  console.log("Total deposits:", ethers.formatEther(await coolBank.totalDeposits()));
  
  console.log("\nDeployment completed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("Network:", await ethers.provider.getNetwork());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
