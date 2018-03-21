const PresaleLEAP = artifacts.require("PresaleLEAP");
const LeapToken = artifacts.require("LeapToken");

let investors = require("../migrate.json");

module.exports = function(deployer, network, accounts) {
	let oldToken;
	let newToken;

	deployer.then(function() {
		return PresaleLEAP.deployed();
	}).then((instance) => {
		oldToken = instance;
	}).then(function() {
		return LeapToken.deployed();
	}).then(function(instance) {
		newToken = instance;
	});

	let missed = 0;
	let done = 0;

	for(let i = 0; i < investors.length; i++) {
		let amount;

		deployer.then(function() {
			return oldToken.balanceOf(investors[i]);
		}).then(function(balance) {
			console.log(`[PresaleLEAP][${investors[i]}][${balance}]`);
			if(balance > 0) {
				deployer.then(function() {
					return oldToken.burn(investors[i], balance);
				}).then(function() {
					return newToken.mint(investors[i], balance);
				}).then(function() {
					return oldToken.balanceOf(investors[i]);
				}).then(function(balance) {
					console.log(`[!PresaleLEAP][${investors[i]}][${balance}]`);
				}).then(function() {
					return newToken.balanceOf(investors[i]);
				}).then(function(balance) {
					console.log(`[!LeapToken][${investors[i]}][${balance}]`);
				}).then(function() {
					done++;
				});
			} else {
				missed++;
			}
		});
	}

	deployer.then(function() {
		function waitFor(fn, timeout) {
			return new Promise((resolve) => {
				setTimeout(() => {
					if(fn()) {
						resolve();
					} else {
						return waitFor(fn, timeout);
					}
				}, timeout);
			});
		}

		return waitFor(() => missed+done >= investors.length, 1000);
	});
}