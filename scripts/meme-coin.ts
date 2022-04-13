// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Foxcoin = await ethers.getContractFactory("MemeCoin");
  const deployFoxcoin = await Foxcoin.deploy();

  await deployFoxcoin.deployed();

  console.log("FoxToken deployed to:", deployFoxcoin.address);

    //   await deployFoxcoin.mint(signer.address, "1000000");

    //   await deployFoxcoin.burn("1000000")

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(100000);

  // Verify the contract after deploying
  //@ts-ignore
  await hre.run("verify:verify", {
    address: deployFoxcoin.address,
    constructorArguments: [],
  });

}

function sleep(ms:number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
