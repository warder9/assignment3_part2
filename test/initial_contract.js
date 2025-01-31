const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
describe("UniversityGroupToken - Initial Contract", function () {
    let Token, token, owner, addr1, addr2;

    beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("contracts/initial_contract.sol:UniversityGroupToken");
    token = await Token.deploy();  // Deploy contract
    await token.waitForDeployment();  // Wait for deployment (Fix for Ethers v6)
});
    

    it("Should have correct name and symbol", async function () {
        expect(await token.name()).to.equal("UniversityGroupToken");
        expect(await token.symbol()).to.equal("UGT");
    });

    it("Should assign the total supply to the deployer", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ownerBalance).to.equal(ethers.parseUnits("2000", await token.decimals()));
    });

    it("Should update latest transaction timestamp on transfer", async function () {
        await token.connect(owner).logTransaction(addr1.address, 100);
        const timestamp = await token.getLatestTransactionTimestamp();
        expect(timestamp).to.be.greaterThan(0);
    });

    it("Should allow checking the sender address", async function () {
        expect(await token.connect(addr1).getTransactionSender()).to.equal(addr1.address);
    });

    it("Should emit TransactionInfo event on transfer", async function () {
        await expect(token.connect(owner).logTransaction(addr1.address, 100))
    .to.emit(token, "TransactionInfo")
    .withArgs(owner.address, addr1.address, 100, anyValue); 
    });
});
