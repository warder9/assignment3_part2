# assignment3_part2 Mukhamedov Alisher, Yerkanat Manasov

![6rz6pr](https://github.com/user-attachments/assets/4371d82e-6655-4f58-8221-91f0333b4d85)

Assignment 3 Report: Smart Contract Development and Testing

Introduction

This report outlines the development and testing of the UniversityGroupToken smart contract as part of Assignment 3, Part 1. The assignment was divided into two parts: implementing an initial version of the contract and modifying it to accept an input parameter. Both versions were tested using the Hardhat framework.

Initial Version of UniversityGroupToken

Smart Contract Implementation

The initial version of the UniversityGroupToken contract was developed using Solidity. The contract extends OpenZeppelin's ERC20 standard and includes the following functionalities:

Minting an initial supply of 2000 tokens to the contract deployer.

Logging transaction information, including sender, receiver, amount, and timestamp.

Retrieving the latest transaction timestamp.

Getting the address of the transaction sender.

Test Cases for the Initial Contract

To ensure the correct functionality of the contract, test cases were written in Hardhat. The tests covered:

Deployment Tests:

Ensured that the contract deployed correctly.

Verified that the contract had the correct name and symbol.

Token Supply and Balance Tests:

Checked if the deployer received the total initial supply of 2000 tokens.

Transaction Logging Tests:

Tested the logTransaction function to ensure that transaction details were logged correctly.

Verified that the TransactionInfo event was emitted with the correct values.

Ensured the latestTransactionTimestamp was updated properly.

Challenges Faced

Initially, there was an issue with multiple artifacts due to different contract versions. This was resolved by specifying the full contract path in Hardhat.

An error occurred when asserting the event timestamp in tests. This was fixed by dynamically retrieving the correct block timestamp.

Modified Version of UniversityGroupToken

Modifications to the Contract

The modified version introduced a constructor parameter to specify the owner’s address. Changes included:

Accepting an address _owner parameter in the constructor.

Assigning the owner’s address dynamically instead of defaulting to msg.sender.

Minting the initial supply to the specified owner rather than the contract deployer.

Test Cases for the Modified Contract

Additional test cases were implemented to cover the new functionality:

Deployment with Owner Parameter:

Verified that the owner specified at deployment received the initial token supply.

Ownership Tests:

Checked that the owner address was correctly set upon deployment.

Event Emission Tests:

Ensured TransactionInfo events emitted the correct details, including dynamically retrieved timestamps.

Challenges and Solutions

Encountered an error due to incorrect assumptions about event timestamp assertions. This was resolved by fetching the block timestamp dynamically within the test.

Faced an issue with token.deployed() not being recognized. The contract instance was correctly assigned by awaiting Token.deploy() without calling deployed().

Conclusion

This assignment provided hands-on experience in developing, modifying, and testing Solidity smart contracts. It reinforced best practices in:

Using OpenZeppelin’s ERC20 standard.

Implementing event logging and timestamp tracking.

Writing robust test cases with Hardhat.

Debugging deployment and event-related issues.

Both versions of the contract were successfully implemented and tested, ensuring that the UniversityGroupToken functions as expected. Future improvements could include adding access control mechanisms and further refining event handling for enhanced security and usability.

![Безымянн2ый](https://github.com/user-attachments/assets/93a227ad-e48b-4dc7-b204-2184e7a489ff)
![Безымянн32ый](https://github.com/user-attachments/assets/733e9541-8521-49df-9d0e-883e66a51595)
![Безымянный](https://github.com/user-attachments/assets/5a0a186c-bcc1-488e-960b-53e87282ab8f)




