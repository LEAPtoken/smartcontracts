const LeapTokensalePlaceholder = artifacts.require('LeapTokensalePlaceholder');
const Tokensale = artifacts.require('LeapPrivatePreTokensaleFake');
const Token = artifacts.require('LEAP');
const BitcoinProxy = artifacts.require('BitcoinProxy');

const utils = require('./utils');
const expect = utils.expect;
const expectThrow = utils.expectThrow;
const ether = utils.ether;
const getBalance = utils.getBalance;
const inBaseUnits = utils.inBaseUnits;

contract("LeapPrivatePreTokensale", function([deployer, token, placeholder, proxy, investor, hacker, kownWallet, leapWallet]) {
	const hardcap = inBaseUnits(52500000);
	const hardcapEth = ether(10000);

	const ethInvestment = ether(0.001);
	const btcInvestment = new web3.BigNumber(10).pow(5);

	const ethRate = new web3.BigNumber(5250); // LEAP/ETH
	const btcRate = new web3.BigNumber(52500).mul(new web3.BigNumber(10).pow(10)); // ETH/BTC

	const testingDivider = 10000;

	before(async function() {
		await utils.advanceBlock();
	});

	beforeEach(async function() {
		this.token = await Token.new();

		this.tokensale = await Tokensale.new(
			utils.latestTime() + 3600,
			this.token.address, placeholder, kownWallet, leapWallet
		);

		await this.tokensale.setBitcoinProxy(proxy);

		await this.tokensale.updateBitcoinMultiplier(100000);

		await this.token.transferOwnership(this.tokensale.address);
	});

	it("should be initialized correctly", async function() {
		expect(await this.tokensale.token()).to.be.equal(this.token.address);
		expect(await this.tokensale.placeholder()).to.be.equal(placeholder);
		expect(await this.tokensale.proxy()).to.be.equal(proxy);
		expect(await this.tokensale.wallet()).to.be.equal(kownWallet);
	});
});