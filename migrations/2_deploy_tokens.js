const NonFungibleCase = artifacts.require('./NonFungibleCase.sol')
const AutonomousQuestionPool = artifacts.require('./AutonomousQuestionPool.sol')
const ParticipantPool = artifacts.require('./ParticipantPool.sol')

module.exports = deployer => {
	deployer.deploy(NonFungibleCase, 'NonFungibleCase', 'NFC')
	deployer.deploy(AutonomousQuestionPool)
	deployer.deploy(ParticipantPool)
}
