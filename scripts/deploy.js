const hardhat = require("hardhat");

async function main() {
 const [deployer, recipientOfFirstTransfer] = await hardhat.ethers.getSigners();
 
 console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  console.log('reciepient of first transfer ', recipientOfFirstTransfer.address)


  const Tether = await hardhat.ethers.getContractFactory("Tether");
  const tether = await Tether.deploy();
  console.log("Tether deployed to:", tether.address);

  const RWD = await hardhat.ethers.getContractFactory("RWD");
  const rwd = await RWD.deploy();
  console.log("RWD deployed to:", rwd.address);

  const DecentralBank = await hardhat.ethers.getContractFactory("DecentralBank");
  const decentralBank = await DecentralBank.deploy(rwd.address, tether.address);
  console.log("DecentralBank deployed to:", decentralBank.address);

  // Transfer all RWD tokens to Decentral Bank
  await rwd.transfer(decentralBank.address,'1000000000000000000000000');

  // Distribute 100 Tether tokens to investor
  await tether.transfer(recipientOfFirstTransfer.address, '100000000000000000000');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });