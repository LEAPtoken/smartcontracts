const Token = artifacts.require("LEAP");
const Placeholder = artifacts.require("LeapTokensalePlaceholder");
const PrivatePresale = artifacts.require("LeapPrivatePreTokensale");
const BitcoinProxy = artifacts.require("BitcoinProxyNoGas");
const BTC = artifacts.require("BTC");
const SafeMath = artifacts.require("SafeMath");

module.exports = function(deployer, network, accounts) {

	let token, placeholder, tokensale, proxy, btcLibrary, mathLibrary;

	const startTime = 1512147657;

	const kWallet = 0x8988905b49Ba113c99B1dD01b8db83d5A14e01cB;
	const lWallet = 0x73397478614f74b5E7f425BCAFD7FF71dd26EF61;

	const mainnetBtcRelay = '0x41f274c0023f83391de4e0733c609df5a124c3d4';
	const ropstenBtcRelay = '0x5770345100a27b15f5b40bec86a701f888e8c601';
	const btcRelay = network === 'mainnet' ? mainnetBtcRelay : ropstenBtcRelay;

	deployer.then(function() {
		return deployer.deploy(SafeMath);
	}).then(function(instance) {
		mathLibrary = instance;
		return deployer.link(SafeMath, PrivatePresale);
	}).then(function() {
		return deployer.deploy(BTC);
	}).then(function(instance) {
		btcLibrary = instance;
		return deployer.link(BTC, BitcoinProxy);
	}).then(function() {
		return Token.new();
	}).then(function(instance) {
		token = instance;
		return Placeholder.new(token.address);
	}).then(function(instance) {
		placeholder = instance;
		return PrivatePresale.new(startTime, token.address, placeholder.address, kWallet, lWallet);
	}).then(function(instance) {
		tokensale = instance;
		return BitcoinProxy.new(btcRelay, tokensale.address);
	}).then(function(instance) {
		proxy = instance;
		return tokensale.setBitcoinProxy(proxy.address);
	}).then(function() {
		return token.pause();
	}).then(function() {
		return token.transferOwnership(tokensale.address);
	}).then(function() {
		console.log("Done!");
		console.log("Token: " + token.address);
		console.log("Placeholder: " + placeholder.address);
		console.log("Private presale: " + tokensale.address);
		console.log("Bitcoin Proxy: " + proxy.address);
	});
}