const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UniversityGroupToken - Modified Contract", function () {
    let Token, token, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("contracts/modified_contract.sol:UniversityGroupToken");
        
        // ✅ Correct Deployment: No need for `deployed()`
        token = await Token.deploy(owner.address);  
    });

    it("Should have correct name and symbol", async function () {
        expect(await token.name()).to.equal("UniversityGroupToken");
        expect(await token.symbol()).to.equal("UGT");
    });


    it("Should correctly set the owner", async function () {
        expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the specified owner", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ownerBalance).to.equal(ethers.parseUnits("2000", await token.decimals()));
    });

    it("Should prevent zero address as owner", async function () {
        await expect(Token.deploy(ethers.ZeroAddress)).to.be.revertedWith("Owner cannot be zero address");
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
    const tx = await token.connect(owner).logTransaction(addr1.address, 100);
    const receipt = await tx.wait(); // Get transaction details

    // Get the timestamp from the latest block
    const blockNumber = receipt.blockNumber;
    const block = await ethers.provider.getBlock(blockNumber);
    const expectedTimestamp = block.timestamp;

    // ✅ Correct event assertion
    await expect(tx)
        .to.emit(token, "TransactionInfo")
        .withArgs(owner.address, addr1.address, 100, expectedTimestamp);
});
});
