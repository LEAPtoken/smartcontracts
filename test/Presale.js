const Presale = artifacts.require('Presale');
const Token = artifacts.require("PresaleLEAP");

const utils = require('./utils');
const expect = utils.expect;
const expectThrow = utils.expectThrow;

contract("Presale", function([deployer, mintAgent, investor]) {
	const investment = 1;
	const expectedBalance = 4500;

	before(async function() {
		await utils.advanceBlock();
	});

	beforeEach(async function() {
		this.token = await Token.new();

		this.token.pause();

		this.presale = await Presale.new(this.token.address);

		await this.token.setMintAgent(this.presale.address, true);
	});

	it("should be initialized correctly", async function() {
		expect(await this.presale.token()).to.be.equal(this.token.address);
		expect(await this.token.mintAgents(this.presale.address)).to.be.equal(true);
	});

	it("should process payments", async function() {
		await utils.setTime(1515888000);

		await this.presale.sendTransaction({from: investor, value: investment});

		expect(await this.presale.weiRaised()).to.be.bignumber.equal(investment);
		expect(await this.token.balanceOf(investor)).to.be.bignumber.equal(expectedBalance);
	});
});