const BEP20TokenImplementation = artifacts.require("BEP20TokenImplementation");
const BEP20UpgradeableProxy = artifacts.require("BEP20UpgradeableProxy");
// const BEP20ProxyFactory = artifacts.require("BEP20ProxyFactory");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(BEP20TokenImplementation);
    await deployer.deploy(BEP20UpgradeableProxy, BEP20TokenImplementation.address);
    // await deployer.deploy(BEP20ProxyFactory, BEP20UpgradeableProxy.address);
  });
};
