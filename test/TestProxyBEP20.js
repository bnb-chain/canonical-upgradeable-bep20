const BEP20TokenImplementation = artifacts.require("BEP20TokenImplementation");
const BEP20UpgradeableProxy = artifacts.require("BEP20UpgradeableProxy");
// const BEP20ProxyFactory = artifacts.require("BEP20ProxyFactory");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const fs = require('fs');

contract('BEP20TransparentUpgradeableProxy', (accounts) => {
    it('Test bep20 methods', async () => {
        // const bep20TokenImplementation = await BEP20TokenImplementation.deployed();
        // const bep20UpgradeableProxy = await BEP20UpgradeableProxy.deployed();
        // const bep20ProxyFactory = await BEP20ProxyFactory.deployed();

        const BEP20Implementation = "test/abi/BEP20Implementation.json";
        const parsed= JSON.parse(fs.readFileSync(jsonFile));
        const abi = parsed.abi;

        const bep20TokenImplementation = new web3.eth.Contract(abi, BEP20TokenImplementation.address);

        let payload = contract['initialize'].getData("ABC Token", "ABC", 8, web3.utils.toBN(1e8).mul(web3.utils.toBN(1e18)), true);

        // const tx = await bep20TokenImplementation.createBEP20Proxy(payload);
        console.log(web3.utils.bytesToHex(payload));
    });
});
