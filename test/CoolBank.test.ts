import { expect } from "chai";
import { ethers } from "hardhat";
import { CoolBank } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("CoolBank", function () {
  let coolBank: CoolBank;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy the contract
    const CoolBank = await ethers.getContractFactory("CoolBank");
    coolBank = await CoolBank.deploy();
    await coolBank.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await coolBank.owner()).to.equal(owner.address);
    });

    it("Should start with zero total deposits", async function () {
      expect(await coolBank.totalDeposits()).to.equal(0);
    });

    it("Should have zero contract balance initially", async function () {
      expect(await coolBank.getContractBalance()).to.equal(0);
    });
  });

  describe("Deposits", function () {
    it("Should allow users to deposit ETH", async function () {
      const depositAmount = ethers.parseEther("1.0");
      
      await expect(coolBank.connect(user1).deposit({ value: depositAmount }))
        .to.emit(coolBank, "Deposit")
        .withArgs(user1.address, depositAmount);

      expect(await coolBank.getBalance(user1.address)).to.equal(depositAmount);
      expect(await coolBank.totalDeposits()).to.equal(depositAmount);
    });

    it("Should reject deposits of 0 ETH", async function () {
      await expect(coolBank.connect(user1).deposit({ value: 0 }))
        .to.be.revertedWith("Deposit amount must be greater than 0");
    });

    it("Should handle multiple deposits correctly", async function () {
      const deposit1 = ethers.parseEther("1.0");
      const deposit2 = ethers.parseEther("0.5");
      
      await coolBank.connect(user1).deposit({ value: deposit1 });
      await coolBank.connect(user1).deposit({ value: deposit2 });

      expect(await coolBank.getBalance(user1.address)).to.equal(deposit1 + deposit2);
      expect(await coolBank.totalDeposits()).to.equal(deposit1 + deposit2);
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      // Deposit some ETH for testing withdrawals
      await coolBank.connect(user1).deposit({ value: ethers.parseEther("2.0") });
    });

    it("Should allow users to withdraw their balance", async function () {
      const withdrawAmount = ethers.parseEther("1.0");
      
      await expect(coolBank.connect(user1).withdraw(withdrawAmount))
        .to.emit(coolBank, "Withdrawal")
        .withArgs(user1.address, withdrawAmount);

      expect(await coolBank.getBalance(user1.address)).to.equal(ethers.parseEther("1.0"));
    });

    it("Should reject withdrawals of 0 ETH", async function () {
      await expect(coolBank.connect(user1).withdraw(0))
        .to.be.revertedWith("Withdrawal amount must be greater than 0");
    });

    it("Should reject withdrawals exceeding balance", async function () {
      const excessiveAmount = ethers.parseEther("3.0");
      
      await expect(coolBank.connect(user1).withdraw(excessiveAmount))
        .to.be.revertedWith("Insufficient balance");
    });

    it("Should reject withdrawals from users with no balance", async function () {
      await expect(coolBank.connect(user2).withdraw(ethers.parseEther("1.0")))
        .to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Balance queries", function () {
    beforeEach(async function () {
      await coolBank.connect(user1).deposit({ value: ethers.parseEther("1.5") });
    });

    it("Should return correct balance for getBalance", async function () {
      expect(await coolBank.getBalance(user1.address)).to.equal(ethers.parseEther("1.5"));
      expect(await coolBank.getBalance(user2.address)).to.equal(0);
    });

    it("Should return correct balance for getMyBalance", async function () {
      expect(await coolBank.connect(user1).getMyBalance()).to.equal(ethers.parseEther("1.5"));
      expect(await coolBank.connect(user2).getMyBalance()).to.equal(0);
    });
  });

  describe("Ownership", function () {
    it("Should allow owner to transfer ownership", async function () {
      await expect(coolBank.connect(owner).transferOwnership(user1.address))
        .to.emit(coolBank, "OwnershipTransferred")
        .withArgs(owner.address, user1.address);

      expect(await coolBank.owner()).to.equal(user1.address);
    });

    it("Should reject ownership transfer from non-owner", async function () {
      await expect(coolBank.connect(user1).transferOwnership(user2.address))
        .to.be.revertedWith("Only owner can call this function");
    });

    it("Should reject ownership transfer to zero address", async function () {
      await expect(coolBank.connect(owner).transferOwnership(ethers.ZeroAddress))
        .to.be.revertedWith("New owner cannot be zero address");
    });
  });

  describe("Contract balance", function () {
    it("Should reflect contract balance correctly", async function () {
      const deposit1 = ethers.parseEther("1.0");
      const deposit2 = ethers.parseEther("0.5");
      
      await coolBank.connect(user1).deposit({ value: deposit1 });
      await coolBank.connect(user2).deposit({ value: deposit2 });

      expect(await coolBank.getContractBalance()).to.equal(deposit1 + deposit2);
    });

    it("Should update contract balance after withdrawals", async function () {
      const depositAmount = ethers.parseEther("2.0");
      const withdrawAmount = ethers.parseEther("0.5");
      
      await coolBank.connect(user1).deposit({ value: depositAmount });
      await coolBank.connect(user1).withdraw(withdrawAmount);

      expect(await coolBank.getContractBalance()).to.equal(depositAmount - withdrawAmount);
    });
  });
});
