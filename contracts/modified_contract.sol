// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UniversityGroupToken is ERC20 {
    // Events for logging transactions
    event TransactionInfo(address indexed sender, address indexed receiver, uint256 value, uint256 timestamp);

    uint256 public latestTransactionTimestamp; // Last transaction timestamp
    address public owner; // Owner of the token

    // Constructor now takes an 'owner' parameter
    constructor(address _owner) ERC20("UniversityGroupToken", "UGT") {
        require(_owner != address(0), "Owner cannot be zero address");
        owner = _owner;
        _mint(owner, 2000 * 10 ** decimals()); // Initial supply of 2000 tokens to the specified owner
    }

    // Function to log transaction information and update timestamp
    function logTransaction(address receiver, uint256 amount) public {
        _transfer(msg.sender, receiver, amount);
        latestTransactionTimestamp = block.timestamp;
        emit TransactionInfo(msg.sender, receiver, amount, block.timestamp);
    }

    // Function to retrieve the latest transaction timestamp
    function getLatestTransactionTimestamp() public view returns (uint256) {
        return latestTransactionTimestamp;
    }

    // Function to retrieve the address of the transaction sender
    function getTransactionSender() public view returns (address) {
        return msg.sender; // Use msg.sender instead of tx.origin
    }
}
