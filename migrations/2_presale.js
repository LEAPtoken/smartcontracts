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
	}).then(function(instance) {
		token = instance;
		console.log("TOKEN: " + token.address);
		return deployer.deploy(Presale, token.address);
	}).then(function(instance) {
		presale = instance;
		console.log("PRESALE: " + presale.address);
		return token.setMintAgent(presale.address, true);
	}).then(function() {
		return token.setMintAgent(accounts[0], true);
	}).then(function() {
		return token.pause();
	});
}