const Presale = artifacts.require('Presale');
const Token = artifacts.require("PresaleLEAP");

const utils = require('./utils');
const expect = utils.expect;
const expectThrow = utils.expectThrow;

const leap = utils.inBaseUnits(18);
const eth = utils.ether;

contract("Presale", function([deployer, mintAgent, investor]) {
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

	it("should calculate stage bonuses correctly", async function() {
		const investment = eth(1);
		const stages = [850, 1700, 2550, 2890, 3230, 3570, 3910, 4250, 4590, 4930, 5270, 5610, 5950, 6290, 6630, 6970, 7310, 7650];
		const expectedBonuses = [1500, 1425, 1350, 1275, 1200, 1125, 1050, 975, 900, 825, 750, 675, 600, 525, 450, 375, 300, 225];

		const bonuses = stages.map(etherTotal => this.presale.stageBonus(investment, eth(etherTotal).sub(1)));

		for(let i = 0; i < expectedBonuses.length; i++) {
			expect(await bonuses[i]).to.be.bignumber.equal(leap(expectedBonuses[i]));
		}
	});

	it("should calculate whale bonuses correctly", async function() {
		const investments = [10, 25, 50, 100, 250, 500];
		const percents = [5, 10, 20, 30, 50, 75];
		const expectedBonuses = [1500, 7500, 30000, 90000, 375000, 1125000];

		const bonuses = investments.map(amount => this.presale.whaleBonus(eth(amount)));

		for(let i = 0; i < bonuses.length; i++) {
			expect(await bonuses[i]).to.be.bignumber.equal(leap(expectedBonuses[i]));
		}
	});
});