import Vuex from 'vuex'
import web3 from '~/plugins/web3'
import web3Abi from 'web3-eth-abi'
import NonFungibleCase from '../../build/contracts/NonFungibleCase'

const IPFS = require('ipfs-api')
const ipfs = IPFS('ipfs.infura.io', '5001', { protocol: 'https' })

const tokenAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'
const aCase = new web3.eth.Contract(NonFungibleCase.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
	account = res[0]
})

const createStore = () => {
	return new Vuex.Store({
		state: {
			formObj: {
				caseName: '',
				caseDescription: '',
				tDistance: '',
				tDuration: '',
				loba_d1: '',
				loba_d2: '',
				loba_d3: ''
			},
			ipfsHash: '',
			txHash: '',
			caseArray: [],
			txArray: [],
			userArray: [] // ERC721 => js filter for ownerOf
		},
		mutations: {
			addCase(state) {
				ipfs.files.add(
					Buffer.from(JSON.stringify(state.formObj)),
					(err, res) => {
						if (err || !res) {
							return console.error('ipfs add fail', err, res)
						}
						res.forEach(function(file) {
							if (file && file.hash) {
								state.ipfsHash = file.hash
								// console.log('ipfsHash: ', state.ipfsHash)
								state.caseArray.push(state.ipfsHash)
								return state.ipfsHash
							}
						})
					}
				)
			},
			confirmTx(state, hash) {
				state.txHash = hash
				state.txArray.push(hash)
			},
			randomNum(state) {
				state.formObj.tDistance = (Math.random() * 10).toFixed(2)
				state.formObj.tDuration = (Math.random() * 5).toFixed(2)
			}
		},
		actions: {
			getIpfsHash(context) {
				return context.getters.getIpfsHash
			},
			getAllCases(context) {
				return context.getters.getAllCases
			},
			getCaseById(context) {
				return context.getters.getCaseById
			},
			getTransactions(context) {
				return context.state.txArray
			},
			randomNum(context) {
				context.commit('randomNum')
			},
			async addCase(context) {
				await context.commit('addCase')
			},
			async getTokenName() {
				return await aCase.methods.name().call({ from: account })
			},
			async mintCase(context) {
				await context.dispatch('addCase')

				const mintMethod = NonFungibleCase.abi.find(method => {
					return method.name === 'mintCase'
				})
				const mintMethodTxData = web3Abi.encodeFunctionCall(mintMethod, [
					context.state.ipfsHash,
					web3.utils.toBN(1)
				])
				const estimateGas = await web3.eth.estimateGas({
					from: account,
					to: tokenAddress,
					data: mintMethodTxData
				})
				const nonce = await web3.eth.getTransactionCount(account)

				const receipt = await web3.eth.sendTransaction({
					from: account,
					to: tokenAddress,
					data: mintMethodTxData,
					value: 0,
					nonce: nonce,
					gas: estimateGas
				})

				await context.commit('confirmTx', receipt.transactionHash)

				console.log('Transaction successful! txHash: ' + context.state.txHash)
				return receipt
			},
			async ipfsHashToData(context) {
				await ipfs.files.cat(context.state.ipfsHash, function(err, file) {
					if (err) {
						throw err
					}
					console.log(file.toString('utf8'))
				})
			}
		},
		getters: {
			getIpfsHash: state => {
				return state.caseArray[state.caseArray.length - 1]
			},
			getAllCases: state => {
				return state.caseArray
			},
			getCaseById: state => id => {
				return state.caseArray[id]
			},
			getTransactions: state => {
				return state.txArray
			}
		}
	})
}

export default createStore
