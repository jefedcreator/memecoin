import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish, Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { any } from "hardhat/internal/core/params/argumentTypes";
import { it } from "mocha";
import { MemeCoin } from "../typechain";

let deployFoxcoin:MemeCoin;
let signer:SignerWithAddress;
let signer2:SignerWithAddress;


describe("MemeToken", function () {
    before(
       async () => {
           const FoxToken = await ethers.getContractFactory("MemeCoin")
            deployFoxcoin = await FoxToken.deploy();
           await deployFoxcoin.deployed();
           [signer, signer2] = await ethers.getSigners()
       }
    )
  it("Should mint tokens upon deployment", async function () {
        const balance = await deployFoxcoin.balanceOf(signer.address)
        const units = ethers.utils.parseEther("1000");
        expect(balance).to.be.equal(units)
  });
  it("Should mint more tokens on function call",async () => {
      const amount = ethers.utils.parseEther("100");
      await deployFoxcoin.mint(signer2.address, amount);
      const balance = await deployFoxcoin.balanceOf(signer2.address);
      expect(balance).to.be.equal(amount);
  })
  it("Should burn tokens on function call",async () => {
    const amount:any = ethers.utils.parseEther("1000");
    const balance:any = await deployFoxcoin.totalSupply();
    await deployFoxcoin.burn(amount);
    const total:BigNumberish = balance - amount;
    const newbalance:BigNumberish = await deployFoxcoin.totalSupply();
    expect((newbalance.toString())).to.be.equal(total.toString())
  })
});
