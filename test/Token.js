const Token = artifacts.require('./PresaleLEAP.sol');

const utils = require('./utils.js');
const expect = utils.expect;
const expectThrow = utils.expectThrow;

contract("Token", function([deployer, mintAgent, anotherMintAgent, investor, hacker]) {
	let token;

	beforeEach(async function() {
		token = await Token.new();
		token.setMintAgent(mintAgent, true);
		token.setMintAgent(anotherMintAgent, true);
		token.pause();
	});

	it("should have zero total supply", async function() {
		expect(await token.totalSupply()).to.be.bignumber.equal(0);
	});

	it("should have owner", async function() {
		expect(await token.owner()).to.be.equal(deployer);
	});

	it("should be paused", async function() {
		expect(await token.paused()).to.be.true;
	});

	it("should be mintable", async function() {
		expect(await token.mintingFinished()).to.be.false;
	});

	it("should not accept payments", async function() {
		await expectThrow(token.send(1));
	});

	it("mint agent should be able to issue tokens", async function() {
		await expectThrow(token.mint(investor, 1000));

		await token.mint(investor, 1000, { from: mintAgent });

		expect(await token.balanceOf(investor)).to.be.bignumber.equal(1000);

		await finishMinting();

		await expectThrow(token.mint(investor, 1000, { from: mintAgent }));
	});

	it("owner should be able to burn tokens", async function() {
		await token.mint(investor, 1000, { from: anotherMintAgent });

		await expectThrow(token.burn(investor, 100));

		await token.burn(investor, 100, { from: anotherMintAgent });

		await token.finishMinting();

		await expectThrow(token.burn(investor, 100, { from: anotherMintAgent }));

		expect(await token.balanceOf(investor)).to.be.bignumber.equal(900);
	});
})