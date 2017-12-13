let HDWalletProvider;
try {
	HDWalletProvider = require('truffle-hdwallet-provider');
} catch(e) {}

const fs = require('fs');
const path = require('path');

let infuraToken = "jPkVat66IVKkmtAsy0DJ";
let mnemonic = "";

if(fs.existsSync(path.resolve(__dirname, "mnemonic"))) {
	mnemonic = fs.readFileSync(path.resolve(__dirname, "mnemonic")).toString().trim();
} else {
	console.log("WARNING! mnemonic file not found");
}

let config = {};
config.networks = {};

config.networks["testrpc"] = {
	host: "testrpc",
	port: 8545,
	gas: 4e6,
	gasPrice: 1,
	network_id: "*"
};

config.networks["nomigration"] = {
	host: "testrpc",
	port: 8545,
	gas: 4e6,
	gasPrice: 1,
	network_id: "*"
};

config.networks["devchain"] = {
	host: "geth",
	port: 8544,
	network_id: "2017042099",
	gasPrice: 1
};

if(HDWalletProvider !== undefined && mnemonic.length > 0) {
	config.networks["mainnet"] = {
		provider: new HDWalletProvider(mnemonic, "https://regularly-unified-antelope.quiknode.io/f4d2be14-6ae1-41e5-a43a-8c44eee19a96/WOUbmu-cTwFxXg27lCLPRw==/"),
		network_id: 1,
		gas: 1e6,
		gasPrice: 17e9
	};

	config.networks["ropsten"] = {
		provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infuraToken),
		network_id: 3,
		gas: 4e6,
		gasPrice: 8e10
	}
}

module.exports = config;