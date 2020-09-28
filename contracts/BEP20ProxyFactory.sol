pragma solidity ^0.5.0;

import '@openzeppelin/upgrades/contracts/upgradeability/ProxyFactory.sol';

contract BEP20ProxyFactory is ProxyFactory {

    address public implementationContract;

    constructor (address _implementationContract) public {
        implementationContract = _implementationContract;
    }

    /**
     * @dev _data should be the abi encoding of BEP20TokenImplementation.initialize and parameters
     */
    function createBEP20Proxy(bytes memory _data) public returns (address){
        address proxy = deployMinimal(implementationContract, _data);
        return proxy;
    }
}