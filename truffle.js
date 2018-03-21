let HDWalletProvider = require('truffle-hdwallet-provider');

const fs = require('fs');
const path = require('path');

let infuraToken = "ylMt1EQfLUbcsnd1SmnB";
let mnemonic = "";

if(fs.existsSync(path.resolve(__dirname, "mnemonic"))) {
	mnemonic = fs.readFileSync(path.resolve(__dirname, "mnemonic")).toString().trim();
} else {
	console.log("WARNING! mnemonic file not found");
}

let config = {};
config.networks = {};

config.networks["development"] = {
	host: "localhost",
	port: 8545,
	gas: 4e6,
	gasPrice: 1,
	network_id: "*"
};

config.networks["nomigration"] = {
	host: "localhost",
	port: 8545,
	gas: 4e6,
	gasPrice: 1,
	network_id: "*"
};

if(HDWalletProvider !== undefined && mnemonic.length > 0) {
	config.networks["mainnet"] = {
		provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"+infuraToken),
		network_id: 1,
		gas: 7e6,
		gasPrice: 70e9
	};

	config.networks["ropsten"] = {
		provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infuraToken),
		network_id: 3,
		gas: 4e6,
		gasPrice: 8e10
	}
}

module.exports = config;