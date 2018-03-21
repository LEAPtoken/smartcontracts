const LeapToken = artifacts.require("LeapToken");
const SafeMath = artifacts.require("SafeMath");

// TODO: REMOVE START
const LEAP = artifacts.require("LEAP");
const PresaleLEAP = artifacts.require("PresaleLEAP");
const investors = require("../migrate.json");
// TODO: REMOVE END

module.exports = function(deployer, network, accounts) {
	let token;

	deployer.then(function() {
		return deployer.deploy(SafeMath);
	}).then(function() {
		return deployer.link(SafeMath, LeapToken);
	}).then(() => {
		return deployer.deploy(LeapToken);
	}).then(function() {
		return LeapToken.deployed();
	}).then(function(instance) {
		token = instance;
	}).then(function() {
		return token.setMintAgent(accounts[0], true);
	}).then(function() {
		console.log("Done!");
		console.log(`LeapToken deployed at ${token.address}`);
		console.log(`${accounts[0]} is mint agent for ${token.address}`);
	});

	// TODO: REMOVE START
	let leap;
	let presaleLeap;

	deployer.then(function() {
		return deployer.deploy(LEAP);
	}).then(function() {
		return LEAP.deployed();
	}).then(function(instance) {
		leap = instance;
	});

	deployer.then(function() {
		return PresaleLEAP.deployed();
	}).then(function(instance) {
		presaleLeap = instance;
	});

	for(let i = 0; i < investors.length; i++) {
		deployer.then(function() {
			return presaleLeap.mint(investors[i], 1000);
		}).then(function() {
			return leap.mint(investors[i], 1000);
		});
	}
	// TODO: REMOVE END
}