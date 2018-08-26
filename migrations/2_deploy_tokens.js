const NonFungibleCase = artifacts.require('./NonFungibleCase.sol')

module.exports = deployer => {
	deployer.deploy(NonFungibleCase, 'NonFungibleCase', 'NFC')
}
