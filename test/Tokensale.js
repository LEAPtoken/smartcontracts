const Token = artifacts.require('LEAP');
const BitcoinRelayFake = artifacts.require('BitcoinRelayFake');
const BitcoinProxy = artifacts.require('BitcoinProxy');
const LeapTokensalePlaceholder = artifacts.require('LeapTokensalePlaceholder');
const Tokensale = artifacts.require('Tokensale');
const TokenHolder = artifacts.require('TokenHolder');
const Multisig = artifacts.require('MultiSigWallet');

const utils = require('./utils.js');
const expect = utils.expect;
const expectThrow = utils.expectThrow;

contract("Tokensale", function([deployer, investor, signer, hacker, proxy, wallet1, wallet2, wallet3, wallet4, wallet5]) {
	const weiInvestment = utils.ether(1);
	const btcInvestment = new web3.BigNumber(10).pow(17); // 0.1 btc

	before(async function() {
		await utils.advanceBlock();
	});

	beforeEach(async function() {
		this.startTime = utils.latestTime() + 3600;

		this.token = await Token.new();

		this.placeholder = await LeapTokensalePlaceholder.new(this.token.address);

		this.wallet = await Multisig.new([wallet1, wallet2, wallet3, wallet4, wallet5], 3);

		this.tokensale = await Tokensale.new(
			this.startTime,
			this.token.address,
			proxy,
			this.placeholder.address,
			this.wallet.address
		);

		this.endTime = await this.tokensale.endTime();

		await this.token.transferOwnership(this.tokensale.address);
	});

	it("should be initialized correctly", async function() {
		expect(await this.tokensale.startTime()).to.be.bignumber.equal(this.startTime);
		expect(await this.tokensale.endTime()).to.be.bignumber.equal(this.endTime);
		expect(this.endTime).to.be.bignumber.above(this.startTime);

		expect(await this.tokensale.proxy()).to.be.equal(proxy);
		expect(await this.tokensale.token()).to.be.equal(this.token.address);
		expect(await this.tokensale.placeholder()).to.be.equal(this.placeholder.address);

		expect(await this.token.owner()).to.be.equal(this.tokensale.address);
	});

	it("should accept ETH payments", async function() {
		await utils.setTime(this.startTime);

		const expectedCoinsAmount = await this.tokensale.ethCalculateCoinsAmount(weiInvestment);

		const walletBalanceBefore = await utils.getBalance(this.wallet.address);
		const investorBalanceBefore = await utils.getBalance(investor);

		const {logs} = await this.tokensale.buyCoinsETH({value: weiInvestment, from: investor});
		const event = logs.find(e => e.event === 'TokenPurchaseETH');
		const lockedAccount = event.args.account;

		const walletBalanceAfter = await utils.getBalance(this.wallet.address);
		const investorBalanceAfter = await utils.getBalance(investor);

		// create locked token holder for investor
		expect(lockedAccount).to.be.not.equal(investor);
		expect(await TokenHolder.at(lockedAccount).beneficiary()).to.be.equal(investor);

		// increase balance of locked account
		expect(await this.token.balanceOf(lockedAccount)).to.be.bignumber.equal(expectedCoinsAmount);

		// increase leap payments counter
		expect(await this.tokensale.leapRaised()).to.be.bignumber.equal(expectedCoinsAmount);

		// increase wei by investor payments counter
		expect(await this.tokensale.weiRaisedBy(investor)).to.be.bignumber.equal(weiInvestment);

		// increase token total supply
		expect(await this.token.totalSupply()).to.be.bignumber.equal(expectedCoinsAmount);

		// forward funds to wallet
		expect(walletBalanceAfter).to.be.bignumber.above(walletBalanceBefore);
		expect(investorBalanceAfter).to.be.bignumber.below(investorBalanceBefore);
	});

	it("should accept BTC payments", async function() {
		await utils.setTime(this.startTime);

		const expectedCoinsAmount = await this.tokensale.btcCalculateCoinsAmount(btcInvestment);

		const {logs} = await this.tokensale.buyCoinsBTC(investor, btcInvestment, {from: proxy});
		const account = logs.find(e => e.event === 'TokenPurchaseBTC').args.account;

		// create locked token holder for investor
		expect(account).to.be.not.equal(investor);
		expect(await TokenHolder.at(account).beneficiary()).to.be.bignumber.equal(investor);

		// increase btc by investor payments counter
		expect(await this.tokensale.satoshiRaisedBy(investor)).to.be.bignumber.equal(btcInvestment);

		// increase leap payments counter
		expect(await this.tokensale.leapRaised()).to.be.bignumber.equal(expectedCoinsAmount);

		// increase token total supply
		expect(await this.token.totalSupply()).to.be.bignumber.equal(expectedCoinsAmount);

		// increase balance of locked account
		expect(await this.token.balanceOf(account)).to.be.bignumber.equal(expectedCoinsAmount);
	});

	it("should lock coins on holder associated to investor", async function() {
		await utils.setTime(this.startTime);

		const expectedCoinsAmountForETH = await this.tokensale.ethCalculateCoinsAmount(weiInvestment);
		const expectedCoinsAmountForBTC = await this.tokensale.btcCalculateCoinsAmount(btcInvestment);
		const expectedCoinsAmountTotal = expectedCoinsAmountForBTC.plus(expectedCoinsAmountForETH);

		const tx = await this.tokensale.buyCoinsETH({value: weiInvestment, from: investor});
		const account = tx.logs[0].args.account;

		const tx2 = await this.tokensale.buyCoinsBTC(investor, btcInvestment, {from: proxy});
		const account2 = tx2.logs[0].args.account;

		expect(account).to.be.equal(account2);

		expect(await this.token.balanceOf(investor)).to.be.bignumber.equal(0);
		expect(await this.token.balanceOf(account)).to.be.bignumber.equal(expectedCoinsAmountTotal);
	});

	it("should reject direct payments", async function() {
		await expectThrow(this.tokensale.sendTransaction({ value: weiInvestment, from: investor }));
	});

	it("should reject payments before start", async function() {
		await expectThrow(this.tokensale.buyCoinsETH({value: weiInvestment, from: investor}));
		await expectThrow(this.tokensale.buyCoinsBTC(investor, btcInvestment, {from: proxy}));
	});

	it("should reject payments after end", async function() {
		await utils.setTime(this.endTime + 1);

		await expectThrow(this.tokensale.buyCoinsETH({value: weiInvestment, from: investor}));
		await expectThrow(this.tokensale.buyCoinsBTC(investor, btcInvestment, {from: proxy}));
	});

	it("should reject payments outside cap", async function() {
		await utils.setTime(this.startTime);

		const ethCapPayment = utils.ether(10);

		await this.tokensale.buyCoinsETH({value: ethCapPayment, from: investor});

		await expectThrow(this.tokensale.buyCoinsETH({value: 1, from: investor}));
		await expectThrow(this.tokensale.buyCoinsBTC(investor, 1, {from: proxy}));
	});

	it("can be finalized by owner after ending", async function() {
		await utils.setTime(this.endTime);

		const tx = await this.tokensale.finalize();
		const event = tx.logs.find(e => e.event === 'Finalized');
		expect(event).to.exist;

		expect(await this.token.owner()).to.be.equal(await this.tokensale.placeholder());
	});

	it("cannot be finalized twice", async function() {
		await utils.setTime(this.endTime);

		await this.tokensale.finalize();
		await expectThrow(this.tokensale.finalize());
	});

	it("cannot be finalized by non-owner", async function() {
		await utils.setTime(this.endTime);

		await expectThrow(this.tokensale.finalize({from: hacker}));
	});

	it("cannot be finalized before ending", async function() {
		await expectThrow(this.tokensale.finalize());
	});

	it("should send funds to multisig wallet", async function() {
		await utils.setTime(this.startTime);

		const investorBalance1 = await utils.getBalance(investor);
		const walletBalance1 = await utils.getBalance(this.wallet.address);

		await this.tokensale.buyCoinsETH({value: weiInvestment, from: investor});

		const investorBalance2 = await utils.getBalance(investor);
		const walletBalance2 = await utils.getBalance(this.wallet.address);

		const transaction = await this.wallet.submitTransaction(investor, weiInvestment, null, { from: wallet1 });
		const transactionId = transaction.logs.find(e => e.event === 'Submission').args['transactionId'];

		const investorBalance3 = await utils.getBalance(investor);
		const walletBalance3 = await utils.getBalance(this.wallet.address);

		await this.wallet.confirmTransaction(transactionId, { from: wallet2 });
		await this.wallet.confirmTransaction(transactionId, { from: wallet3 });

		await expectThrow(this.wallet.confirmTransaction(transactionId, { from: wallet4 }));

		const investorBalance4 = await utils.getBalance(investor);
		const walletBalance4 = await utils.getBalance(this.wallet.address);

		expect(walletBalance1).to.be.bignumber.equal(0);
		expect(walletBalance2).to.be.bignumber.equal(utils.inEther(weiInvestment));
		expect(investorBalance2).to.be.bignumber.below(investorBalance1);
		expect(investorBalance3).to.be.bignumber.equal(investorBalance2);
		expect(walletBalance3).to.be.bignumber.equal(walletBalance2);
		expect(investorBalance4).to.be.bignumber.above(investorBalance3);
		expect(walletBalance4).to.be.bignumber.below(walletBalance3);
	});
});