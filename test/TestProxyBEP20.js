const truffleAssert = require('truffle-assertions');

const BEP20TokenImplementation = artifacts.require("BEP20TokenImplementation");
// const BEP20UpgradeableProxy = artifacts.require("BEP20UpgradeableProxy");
const BEP20TokenFactory = artifacts.require("BEP20TokenFactory");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const fs = require('fs');

let bep20TokenAddress;

contract('Upgradeable BEP20 token', (accounts) => {
    it('Create Token', async () => {
        const BEP20TokenFactoryInstance = await BEP20TokenFactory.deployed();
        bep20FactoryOwner = accounts[0];
        bep20Owner = accounts[1];
        proxyAdmin = accounts[0];

        const tx = await BEP20TokenFactoryInstance.createBEP20Token("ABC Token", "ABC", 18, web3.utils.toBN(1e18), true, bep20Owner, proxyAdmin, {from: bep20FactoryOwner});
        truffleAssert.eventEmitted(tx, "TokenCreated",(ev) => {
            bep20TokenAddress = ev.token;
            return true;
        });

    });
    it('Test bep20 query methods', async () => {
        const jsonFile = "test/abi/IBEP20.json";
        const abi= JSON.parse(fs.readFileSync(jsonFile));

        bep20Owner = accounts[1];

        const bep20 = new web3.eth.Contract(abi, bep20TokenAddress);

        const name = await bep20.methods.name().call({from: bep20Owner});
        assert.equal(name, "ABC Token", "wrong token name");

        const symbol = await bep20.methods.symbol().call({from: bep20Owner});
        assert.equal(symbol, "ABC", "wrong token symbol");

        const decimals = await bep20.methods.decimals().call({from: bep20Owner});
        assert.equal(decimals, 18, "wrong token decimals");

        const totalSupply = await bep20.methods.totalSupply().call({from: bep20Owner});
        assert.equal(totalSupply, web3.utils.toBN(1e18), "wrong totalSupply");

        const bep20OwnerBalance = await bep20.methods.balanceOf(bep20Owner).call({from: bep20Owner});
        assert.equal(bep20OwnerBalance, web3.utils.toBN(1e18), "wrong balance");

        const owner = await bep20.methods.getOwner().call({from: bep20Owner});
        assert.equal(owner, bep20Owner, "wrong owner");
    });

    it('Test bep20 transaction methods', async () => {
        const jsonFile = "test/abi/IBEP20.json";
        const abi= JSON.parse(fs.readFileSync(jsonFile));

        bep20Owner = accounts[1];

        const bep20 = new web3.eth.Contract(abi, bep20TokenAddress);

        const balanceOld = await bep20.methods.balanceOf(accounts[2]).call({from: bep20Owner});
        assert.equal(balanceOld, web3.utils.toBN(0), "wrong balance");

        await bep20.methods.transfer(accounts[2], web3.utils.toBN(1e17)).send({from: bep20Owner});

        const balanceNew = await bep20.methods.balanceOf(accounts[2]).call({from: bep20Owner});
        assert.equal(balanceNew, web3.utils.toBN(1e17), "wrong balance");

        await bep20.methods.approve(accounts[3], web3.utils.toBN(1e17)).send({from: bep20Owner});

        let allowance = await bep20.methods.allowance(bep20Owner, accounts[3]).call({from: accounts[3]});
        assert.equal(allowance, web3.utils.toBN(1e17), "wrong allowance");

        await bep20.methods.transferFrom(bep20Owner, accounts[4], web3.utils.toBN(1e17)).send({from: accounts[3]});

        allowance = await bep20.methods.allowance(bep20Owner, accounts[3]).call({from: accounts[3]});
        assert.equal(allowance, web3.utils.toBN(0), "wrong allowance");
        const balance = await bep20.methods.balanceOf(accounts[4]).call({from: accounts[4]});
        assert.equal(balance, web3.utils.toBN(1e17), "wrong balance");
    });

    it('Test mint and burn', async () => {
        const jsonFile = "test/abi/BEP20Implementation.json";
        const abi= JSON.parse(fs.readFileSync(jsonFile));

        bep20Owner = accounts[1];

        const bep20 = new web3.eth.Contract(abi, bep20TokenAddress);

        let totalSupply = await bep20.methods.totalSupply().call({from: bep20Owner});
        assert.equal(totalSupply, web3.utils.toBN(1e18), "wrong totalSupply");

        await bep20.methods.mint(web3.utils.toBN(9e18)).send({from: bep20Owner});

        totalSupply = await bep20.methods.totalSupply().call({from: bep20Owner});
        assert.equal(totalSupply, web3.utils.toBN(10e18), "wrong totalSupply");

        await bep20.methods.transfer(accounts[5], web3.utils.toBN(2e18)).send({from: bep20Owner});
        await bep20.methods.burn(web3.utils.toBN(2e18)).send({from: accounts[5]});

        totalSupply = await bep20.methods.totalSupply().call({from: accounts[5]});
        assert.equal(totalSupply, web3.utils.toBN(8e18), "wrong totalSupply");
    });
});
