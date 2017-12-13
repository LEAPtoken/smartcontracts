const Token = artifacts.require("LEAP");
const Placeholder = artifacts.require("LeapTokensalePlaceholder");
const PrivatePresale = artifacts.require("LeapPrivatePreTokensale");
const Presale = artifacts.require("LeapPreTokensale");
const BitcoinProxy = artifacts.require("BitcoinProxyNoGas");
const BTC = artifacts.require("BTC");
const SafeMath = artifacts.require("SafeMath");

module.exports = function(deployer, network, accounts) {
	if(network === 'nomigration') return;

	let previousTokensale, nextTokensale, token, placeholder, mathLib, actualStartTime, actualEndTime;

	const startTime = 2513002867;

	const kWallet = '0x8988905b49Ba113c99B1dD01b8db83d5A14e01cB';
	const lWallet = '0x73397478614f74b5E7f425BCAFD7FF71dd26EF61';

	PrivatePresale.deployed().then(function(instance) {
		previousTokensale = instance;
		return previousTokensale.finalize();
	}).then(function(result) {
		return Token.deployed();
	}).then(function(instance) {
		token = instance;
		return Placeholder.deployed();
	}).then(function(instance) {
		placeholder = instance;
		return SafeMath.deployed();
	}).then(function(instance) {
		mathLib = instance;
		return deployer.link(SafeMath, Presale);
	}).then(function() {
		return deployer.deploy(Presale, startTime, token.address, placeholder.address, kWallet, lWallet);
	}).then(function() {
		return Presale.deployed();
	}).then(function(instance) {
		nextTokensale = instance;
		console.log("Next tokensale: " + nextTokensale.address);
		console.log("Placeholder: " + placeholder.address);
		console.log("Token: " + token.address);
		return token.owner();
	}).then(function(tokenOwner) {
		console.log("Token owner: " + tokenOwner);
		return placeholder.token();
	}).then(function(placeholderToken) {
		console.log("Placeholder token: " + placeholderToken);
	}).then(function() {
		return placeholder.changeTokenController(nextTokensale.address);
	}).then(function() {
		console.log("Done!");
		return token.owner();
	}).then(function(tokenOwner) {
		console.log("Token owner: " + tokenOwner);
	}).catch(function(reason) {
		console.error(reason);
	});
}