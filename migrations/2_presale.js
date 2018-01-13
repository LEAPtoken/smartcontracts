const Token = artifacts.require("PresaleLEAP");
const Presale = artifacts.require("Presale");
const SafeMath = artifacts.require("SafeMath");

module.exports = function(deployer, network, accounts) {
	if(network === 'nomigration') return;

	let token, presale;

	deployer.then(function() {
		return deployer.deploy(SafeMath);
	}).then(function() {
		return deployer.link(SafeMath, Presale);
	}).then(function() {
		return deployer.deploy(Token);
	}).then(function() {
		return Token.deployed();
	}).then(function(tokenInstance) {
		token = tokenInstance;
	}).then(function() {
		return deployer.deploy(Presale, token.address);
	}).then(function() {
		return Presale.deployed();
	}).then(function(presaleInstance) {
		presale = presaleInstance;

		return token.setMintAgent(presale.address, true);
	}).then(function() {
		return token.setMintAgent(accounts[0], true);
	}).then(function() {
		return token.pause();
	});
}