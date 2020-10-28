pragma solidity ^0.6.0;

import './BEP20UpgradeableProxy.sol';
import './IProxyBEP20.sol';

contract Ownable {
    address public owner;

    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Allows the current owner to relinquish control of the contract.
     * @notice Renouncing to ownership will leave the contract without an owner.
     * It will not be possible to call the functions with the `onlyOwner`
     * modifier anymore.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipRenounced(owner);
        owner = address(0);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param _newOwner The address to transfer ownership to.
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        _transferOwnership(_newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param _newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address _newOwner) internal {
        require(_newOwner != address(0));
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}

contract BEP20TokenFactory is Ownable{

    address public logicImplement;

    event TokenCreated(address indexed token);

    constructor(address _logicImplement) public {
        logicImplement = _logicImplement;
    }

    function createBEP20Token(string calldata name, string calldata symbol, uint8 decimals, uint256 amount, bool mintable, address owner, address admin) external onlyOwner returns (address) {
        BEP20UpgradeableProxy proxyToken = new BEP20UpgradeableProxy(logicImplement, admin, "");

        IProxyBEP20 token = IProxyBEP20(address(proxyToken));
        token.initialize(name, symbol, decimals, amount, mintable, owner);
        emit TokenCreated(address(token));
        return address(token);
    }
}