pragma solidity ^0.6.0;

interface ApproveAndCallFallBack {
    function receiveApproval(address _from, uint256 _amount, bytes calldata _data) external;
}
