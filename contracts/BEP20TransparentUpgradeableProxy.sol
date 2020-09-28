pragma solidity 0.6.4;

import "openzeppelin-solidity/contracts/proxy/TransparentUpgradeableProxy.sol";

contract BEP20TransparentUpgradeableProxy is TransparentUpgradeableProxy {

    constructor(address logic) TransparentUpgradeableProxy(logic, msg.sender, "") public {

    }

}