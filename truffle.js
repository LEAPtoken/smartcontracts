const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const path = require('path');

let infuraToken = "";
let mnemonic = "";

if(fs.existsSync(path.resolve(__dirname, "mnemonic"))) {
    mnemonic = fs.readFileSync(path.resolve(__dirname, "mnemonic")).toString();
} else {
    console.log("WARNING! mnemonic file not found");
}

module.exports = {
  networks: {
    mainnet: {
        provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"+infuraToken),
        network_id: 1,
        gas: 4e6
    },
    ropsten: {
        provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infuraToken),
        network_id: 3,
        gas: 4e6
    },
    development: {
        host: "localhost",
        port: 8545,
        network_id: "*", // Match any network id
        gasPrice: 1
    }
  }
};
