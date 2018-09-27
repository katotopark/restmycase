const contractDefinition = artifacts.require('./QuestionPool.sol')

contract('QuestionPool', accounts => {
	var owner = accounts[0]
	var user = accounts[1]

	beforeEach(async function() {
		contractInstance = await contractDefinition.new({ from: owner })
	})
	describe('constructor', () => {
		it('initializes with 2 questions', async function() {
			let qCount = await contractInstance.questionsCount()

			assert.equal(qCount, 2)
		})
	})

	describe('addQuestion', () => {
		it('adds a new question', async function() {
			let tx = await contractInstance.addQuestion('some q', 2, { from: owner })
			let qCount = await contractInstance.questionsCount()

			assert.equal(qCount, 3)
		})
	})

	describe('vote', () => {
		it('casts a vote', async function() {
			let tx = await contractInstance.vote(2, { from: owner })
			let qId = tx.logs[0].args._questionId.toNumber()

			assert.equal(2, qId)
		})
	})
	describe('voter', () => {
		it('checks if an address has voted', async function() {
			let tx = await contractInstance.vote(2, { from: owner })
			let txLog = await tx.logs[0].args._questionId

			assert.equal(txLog, 2)
			assert.equal(await contractInstance.voters(owner), true)
		})
	})
	// invalid question
	// double voting
})
