const contractDefinition = artifacts.require('./ParticipantPool.sol')

contract('ParticipantPool', accounts => {
	var owner = accounts[0]
	var user = accounts[1]

	beforeEach(async function() {
		contractInstance = await contractDefinition.new({ from: owner })
	})
	describe('constructor', () => {
		it('initializes with 1 participant', async function() {
			let confirm = await contractInstance.voters(owner)

			assert.equal(confirm, true)
		})
	})
	describe('addParticipant', () => {
		it('adds a participant', async function() {
			let tx = await contractInstance.addParticipant('hasan götebakan', true, {
				from: user
			})
			let pCount = await contractInstance.participantCount()
			let voter = await contractInstance.voters(user)

			assert.equal(pCount, 2)
			assert.equal(voter, true)
		})
	})
})
