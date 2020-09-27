const BEP20ProxyAdmin = artifacts.require("BEP20ProxyAdmin");
const BEP20Token = artifacts.require("BEP20Token");
const BEP20TransparentUpgradeableProxy = artifacts.require("BEP20TransparentUpgradeableProxy");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(BEP20ProxyAdmin);
    await deployer.deploy(BEP20Token);
    console.log(BEP20ProxyAdmin.address);
    console.log(BEP20Token.address);
    await deployer.deploy(BEP20TransparentUpgradeableProxy, BEP20ProxyAdmin.address, BEP20Token.address, web3.utils.hexToBytes("0x"))
  });
};
