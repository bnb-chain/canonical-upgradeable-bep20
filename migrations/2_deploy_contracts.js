const BEP20Token = artifacts.require("BEP20Token");
const BEP20TransparentUpgradeableProxy = artifacts.require("BEP20TransparentUpgradeableProxy");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(BEP20Token);
    await deployer.deploy(BEP20TransparentUpgradeableProxy, BEP20Token.address)
  });
};
