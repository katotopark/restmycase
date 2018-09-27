const contractDefinition = artifacts.require('./NonFungibleCase.sol')

contract('NonFungibleCase', accounts => {
	var owner = accounts[0]
	var user = accounts[1]

	beforeEach(async function() {
		contractInstance = await contractDefinition.new('RestMyCase', 'RMC', {
			from: owner
		})
	})

	describe('mintCase', () => {
		it('mints a case', async function() {
			let tx = await contractInstance.mintCase(
				'some IPFShash',
				web3.toWei(0.001, 'ether'),
				{ from: owner }
			)
			let tokenId = tx.logs[0].args._tokenId // one of the 3 return values of a tx (_from, _to ,_tokenId)

			assert.equal(
				await contractInstance.ownerOf(tokenId),
				contractInstance.address
			)
		})
	})

	describe('buyCase', () => {
		it('buys a case', async function() {
			let tx = await contractInstance.mintCase(
				'some IPFShash',
				web3.toWei(0.001, 'ether'),
				{ from: owner }
			)
			let tokenId = tx.logs[0].args._tokenId

			let tx2 = await contractInstance.buyCase(tokenId, {
				from: user,
				value: web3.toWei(0.001, 'ether')
			})

			assert.equal(user, await contractInstance.ownerOf(tokenId))
		})
	})

	describe('tokensOf', () => {
		it('gets tokens of an address', async function() {
			await contractInstance.mintCase(
				'some IPFShash',
				web3.toWei(0.001, 'ether'),
				{
					from: owner
				}
			)
			await contractInstance.mintCase(
				'some IPFShash2',
				web3.toWei(0.001, 'ether'),
				{
					from: owner
				}
			)
			await contractInstance.mintCase(
				'some IPFShash3',
				web3.toWei(0.001, 'ether'),
				{
					from: owner
				}
			)

			let tokens = await contractInstance.tokensOf(contractInstance.address)
			assert.equal(tokens.length, 3)
		})
	})

	describe('getIpfsHash', () => {
		it('gets the IPFS hash of a token', async function() {
			let tx = await contractInstance.mintCase(
				'some IPFShash',
				web3.toWei(0.001, 'ether'),
				{ from: owner }
			)
			let tokenId = tx.logs[0].args._tokenId

			assert.equal(await contractInstance.getIpfsHash(tokenId), 'some IPFShash')
		})
	})

	describe('getToken', () => {
		it('gets a token by IPFS hash', async function() {
			let tx = await contractInstance.mintCase(
				'some IPFShash',
				web3.toWei(0.001, 'ether'),
				{ from: owner }
			)
			let tokenId = tx.logs[0].args._tokenId

			assert.equal(1, await contractInstance.getToken('some IPFShash'))
		})
	})
	describe('totalSupply', () => {
		it('returns total case supply', async function() {
			await contractInstance.mintCase(
				'some IPFShash',
				web3.toWei(0.001, 'ether'),
				{
					from: owner
				}
			)
			await contractInstance.mintCase(
				'some IPFShash2',
				web3.toWei(0.001, 'ether'),
				{
					from: owner
				}
			)
			await contractInstance.mintCase(
				'some IPFShash3',
				web3.toWei(0.001, 'ether'),
				{
					from: owner
				}
			)

			assert.equal(3, await contractInstance.totalSupply())
		})

		xdescribe('mint overlap', () => {
			it('prevents minting two identical tokens', async function() {
				await contractInstance.mintCase(
					'some IPFShash',
					web3.toWei(0.001, 'ether'),
					{
						from: owner
					}
				)
				await contractInstance.mintCase(
					'some IPFShash2',
					web3.toWei(0.001, 'ether'),
					{
						from: owner
					}
				)
			})
		})
	})

	// cannot create two of the same ipfsHash
	// cannot have more than one owners
	// cannot buy if eth not enough
	//
})
