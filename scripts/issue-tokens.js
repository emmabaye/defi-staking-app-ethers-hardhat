const DecentralBank = artifacts.require("DEcentralBank");

module.exports = async function issueRewards(callBack) {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issueTokens();
  console.log("Tokens have been issued successfully");
  callBack()
};
