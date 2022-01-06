require("@nomiclabs/hardhat-waffle")

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    /* rinkeby: {
      url: process.env.INFURA_URL,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY}`]
    }*/
  }, 
  solidity: {
    version: "0.5.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts",
  },
  mocha: {
    timeout: 20000
  }
}
