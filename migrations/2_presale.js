const Token = artifacts.require("LEAP");
const Placeholder = artifacts.require("LeapTokensalePlaceholder");
const SafeMath = artifacts.require("SafeMath");

const PresalePrevious = artifacts.require("LeapPreTokensale");
const Presale = artifacts.require("LeapPreTokensaleJanuary");

module.exports = function(deployer, network, accounts) {
	if(network === 'nomigration') return;

	let previousTokensale, nextTokensale, token, placeholder, mathLib, actualStartTime, actualEndTime;

	const startTime = Math.floor((new Date() / 1000)) + 1800;

	const kWallet = '0xF869E31a013a7Fd78EEcc67383812DEA9184957e';
	const lWallet = '0x8BDa06b0Df609B02f59a3D4794ac42403de574aA';

	deployer.then(function() {
		return PresalePrevious.deployed();
	}).then(function(instance) {
		previousTokensale = instance;
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