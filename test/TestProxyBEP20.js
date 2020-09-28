const BEP20ProxyAdmin = artifacts.require("BEP20ProxyAdmin");
const BEP20Token = artifacts.require("BEP20Token");
const BEP20TransparentUpgradeableProxy = artifacts.require("BEP20TransparentUpgradeableProxy");
const IBEP20 = artifacts.require("IBEP20");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


contract('BEP20TransparentUpgradeableProxy', (accounts) => {
    it('Test bep20 methods', async () => {
        const bep20ProxyAdmin = await BEP20ProxyAdmin.deployed();
        const bep20Token = await BEP20Token.deployed();
        const bep20TransparentUpgradeableProxy = await BEP20TransparentUpgradeableProxy.deployed();

        const decimals = await bep20Token.decimals.call();
        console.log(decimals.toString());


        const testContract = BEP20Token.attach(BEP20TransparentUpgradeableProxy.address);
        await testContract.initialize({from: accounts[0]});

        const proxyDecimals = await bep20TransparentUpgradeableProxy.decimals.call();
        console.log(proxyDecimals);
    });
});
