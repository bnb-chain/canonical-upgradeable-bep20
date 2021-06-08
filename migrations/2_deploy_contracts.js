const BEP20TokenImplementation = artifacts.require("BEP20TokenImplementation");
const BEP20TokenImplementationV1 = artifacts.require("BEP20TokenImplementationV1");
const ApproveAndCallFallBackTest = artifacts.require("ApproveAndCallFallBackTest");
const BEP20TokenFactory = artifacts.require("BEP20TokenFactory");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const fs = require('fs');

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(BEP20TokenImplementation);
    await deployer.deploy(BEP20TokenImplementationV1);
    await deployer.deploy(ApproveAndCallFallBackTest);
    await deployer.deploy(BEP20TokenFactory, BEP20TokenImplementation.address);
  });
};
