import Vuex from 'vuex'
import web3 from '~/plugins/web3'
import web3Abi from 'web3-eth-abi'
import NonFungibleCase from '../../build/contracts/NonFungibleCase'
import * as questions_0 from './questionsDefault'

const IPFS = require('ipfs-api')
// const ipfs = IPFS('ipfs.infura.io', '5001', { protocol: 'https' })
const ipfs = IPFS()

const tokenAddress = '0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6'
const aNFC = new web3.eth.Contract(NonFungibleCase.abi, tokenAddress)

async function getAccount() {
	let accounts = await web3.eth.getAccounts()
	return accounts[0]
}

const createStore = () => {
	const store = new Vuex.Store({
		state: {
			formObj: {
				caseName: '',
				caseDescription: '',
				tDistance: '',
				tDuration: '',
				lobas: {}
			},
			totalLoba: 0,
			ipfsHash: '',
			txHash: '',
			questionsArray: [],
			caseArray: [],
			txArray: [],
			userArray: [] // ERC721 => js filter for ownerOf
		},
		mutations: {
			initializeStore(state) {
				if (process.browser && localStorage.getItem('store')) {
					this.replaceState(
						Object.assign(state, JSON.parse(localStorage.getItem('store')))
					)
				}
			},
			resetHash(state, payload) {
				state.ipfsHash = payload
			},
			confirmTx(state, hash) {
				state.txHash = hash
				state.txArray.push(hash)
			},
			randomNum(state) {
				state.formObj.tDistance = (Math.random() * 10).toFixed(2)
				state.formObj.tDuration = (Math.random() * 5).toFixed(2)
			},
			setLobas(state, payload) {
				state.formObj.lobas[payload.id] = payload.score
			},
			describeCase(state, payload) {
				state.formObj.caseName = payload.caseName
				state.formObj.caseDescription = payload.caseDescription
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
			setQuestions(context) {
				context.commit('setQuestions')
			},
			addQuestion(context, payload) {
				context.commit('addQuestion', payload)
			},
			voteQuestion(context, payload) {
				context.commit('voteQuestion', payload)
			},
			formatLobaQuestions(context) {
				context.commit('formatLobaQuestions')
			},
			async composeLobaQuestions(context) {
				await context.dispatch('setQuestions')
				context.dispatch('formatLobaQuestions')
			},
			randomNum(context) {
				context.commit('randomNum')
			},
			async setLobas(context, payload) {
				await context.commit('setLobas', payload)
			},
			async describeCase(context, payload) {
				await context.commit('describeCase', payload)
			},
			async getTokenName() {
				return await aNFC.methods.name().call({ from: getAccount() })
			},
			async addForm(context) {
				const contextBuffer = Buffer.from(JSON.stringify(context.state.formObj))

				return ipfs.files
					.add(contextBuffer)
					.then(res => {
						return res.map(file => {
							context.commit('resetHash', file.hash)
							console.log('Writing to IPFS returned the hash', file.hash)
							return file.hash
						})
					})
					.catch(err => {
						return console.error('ipfs add fail', err)
					})
			},
			async mintComposed(context) {
				await context.dispatch('addForm')
				context.dispatch('mintCase')
			},
			async mintCase(context) {
				let account = await getAccount()

				const mintMethod = NonFungibleCase.abi.find(method => {
					return method.name === 'mintCase'
				})
				const mintMethodTxData = web3Abi.encodeFunctionCall(mintMethod, [
					context.state.ipfsHash,
					web3.utils.toBN(1)
				])
				console.log('Trying transaction for IPFS hash', context.state.ipfsHash)
				const estimateGas = await web3.eth.estimateGas({
					from: account,
					to: tokenAddress,
					data: mintMethodTxData
				})
				const nonce = await web3.eth.getTransactionCount(account)
				console.log('Transaction count for account', account, 'is', nonce)

				const receipt = await web3.eth.sendTransaction({
					from: account,
					to: tokenAddress,
					data: mintMethodTxData,
					value: 0,
					nonce: nonce,
					gas: estimateGas
				})

				if (receipt.status !== true) {
					throw new Error('The transaction failed.')
				}

				await context.commit('confirmTx', receipt.transactionHash)

				console.log('Transaction successful!')
				console.log('Receipt:', receipt)

				return receipt
			},
			async getUsersCases(context, payload) {
				let account = await getAccount()
				const casesArr = await aNFC.methods
					.tokensOf(payload)
					.call({ from: account })
				return casesArr
			},
			async getCaseHash(context, payload) {
				let account = await getAccount()
				const caseHash = await aNFC.methods
					.getIpfsHash(payload)
					.call({ from: account })
				return caseHash
			},
			async caseHashToData(context, payload) {
				//+console.log(`Payload (type ${typeof payload}) is`, payload)
				let output = await ipfs.files.cat(payload)
				return output
			}
		},
		getters: {
			getQuestionsByGroup: state => group => {
				let output = state.questionsArray.filter(q => q.group === group)
				return output
			},
			getQuestionsByVote: state => {
				let output = []
				state.questionsArray.forEach(q => {
					if (output.length < 5) {
						output.push(q)
						output.sort(function(a, b) {
							return b.voteCount - a.voteCount
						})
					}
				})
				return output
			}
		}
	})
	store.subscribe((mutation, state) => {
		if (process.browser) {
			localStorage.setItem('createStore', JSON.stringify(state))
		}
	})
	return store
}

export default createStore
