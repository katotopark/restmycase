const NonFungibleCase = artifacts.require('./NonFungibleCase.sol')
const QuestionPool = artifacts.require('./QuestionPool.sol')
const ParticipantPool = artifacts.require('./ParticipantPool.sol')

module.exports = deployer => {
	deployer.deploy(NonFungibleCase, 'NonFungibleCase', 'NFC')
	deployer.deploy(QuestionPool)
	deployer.deploy(ParticipantPool)
}
