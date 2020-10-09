const BEP20TokenImplementation = artifacts.require("BEP20TokenImplementation");
const BEP20UpgradeableProxy = artifacts.require("BEP20UpgradeableProxy");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const fs = require('fs');

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(BEP20TokenImplementation);
    const bep20Owner = accounts[1];
    const abiEncodeData = web3.eth.abi.encodeFunctionCall({
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "decimals",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "mintable",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, ["ABC Token", "ABC", 18, web3.utils.toBN(1e18), true, bep20Owner]);
    await deployer.deploy(BEP20UpgradeableProxy, BEP20TokenImplementation.address, accounts[0], abiEncodeData);
  });
};
