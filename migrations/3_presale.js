const Token = artifacts.require("LEAP");
const Placeholder = artifacts.require("LeapTokensalePlaceholder");
const PrivatePresale = artifacts.require("LeapPrivatePreTokensale");
const Presale = artifacts.require("LeapPreTokensale");
const SafeMath = artifacts.require("SafeMath");

module.exports = function(deployer, network, accounts) {
	if(network === 'nomigration') return;

	let previousTokensale, nextTokensale, token, placeholder, mathLib, actualStartTime, actualEndTime;

	const startTime = Math.floor((new Date() / 1000)) + 3600;

	const kWallet = '0x8988905b49Ba113c99B1dD01b8db83d5A14e01cB';
	const lWallet = '0x73397478614f74b5E7f425BCAFD7FF71dd26EF61';

	deployer.then(function() {
		return PrivatePresale.deployed();
	}).then(function(instance) {
		previousTokensale = instance;
		return previousTokensale.finalize();
	}).then(function(result) {
		console.log("Previous tokensale: " + previousTokensale.address + " was finalized");
		return Token.deployed();
	}).then(function(instance) {
		token = instance;
		console.log("Token: " + token.address);
		return Placeholder.deployed();
	}).then(function(instance) {
		placeholder = instance;
		console.log("Placeholder: " + placeholder.address);
		return deployer.deploy(SafeMath);
	}).then(function(instance) {
		mathLib = instance;
		console.log("Math Library: " + mathLib.address);
		return deployer.link(SafeMath, Presale);
	}).then(function() {
		return deployer.deploy(Presale, startTime, token.address, placeholder.address, kWallet, lWallet);
	}).then(function() {
		return Presale.deployed();
	}).then(function(instance) {
		nextTokensale = instance;
		console.log("Next tokensale: " + nextTokensale.address);
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