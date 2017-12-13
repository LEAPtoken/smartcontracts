var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network) {
  if(network === 'nomigration') return;

  deployer.deploy(Migrations);
};
