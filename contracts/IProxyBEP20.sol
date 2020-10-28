pragma solidity ^0.6.0;

interface IProxyBEP20 {
    function initialize(string calldata name, string calldata symbol, uint8 decimals, uint256 amount, bool mintable, address owner) external;
    function changeAdmin(address newAdmin) external;
}