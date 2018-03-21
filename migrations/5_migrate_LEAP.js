const LEAP = artifacts.require("LEAP");
const LeapToken = artifacts.require("LeapToken");

let investors = require("../migrate.json");

module.exports = function(deployer, network, accounts) {
	let oldToken;
	let newToken;

	deployer.then(function() {
		return LEAP.deployed();
	}).then((instance) => {
		oldToken = instance;
	}).then(function() {
		return LeapToken.deployed();
	}).then(function(instance) {
		newToken = instance;
	});

	for(let i = 0; i < investors.length; i++) {
		let amount;

		deployer.then(function() {
			return oldToken.balanceOf(investors[i]);
		}).then(function(balance) {
			console.log(`[LEAP][${investors[i]}][${balance}]`);
			if(balance > 0) {
				deployer.then(function() {
					return oldToken.refund(investors[i], balance);
				}).then(function() {
					return newToken.mint(investors[i], balance);
				}).then(function() {
					return oldToken.balanceOf(investors[i]);
				}).then(function(balance) {
					console.log(`[!LEAP][${investors[i]}][${balance}]`);
				}).then(function() {
					return newToken.balanceOf(investors[i]);
				}).then(function(balance) {
					console.log(`[!LeapToken][${investors[i]}][${balance}]`);
				});
			}
		});
	}
}