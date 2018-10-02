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

let account
web3.eth.getAccounts().then(res => {
	account = res[0]
})

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
			setLobaQuestions(state) {
				state.questionsArray = questions_0.map(item => {
					let output = {
						value: item.value,
						group: item.group,
						voteCount: item.voteCount
					}
					return output
				})
			},
			addLobaQuestion(state, payload) {
				state.questionsArray.push(payload)
			},
			voteLobaQuestion(state, payload) {
				state.questionsArray[payload].voteCount++
			},
			addForm(state) {
				ipfs.files.add(
					Buffer.from(JSON.stringify(state.formObj)),
					(err, res) => {
						if (err || !res) {
							return console.error('ipfs add fail', err, res)
						}
						res.forEach(function(file) {
							if (file && file.hash) {
								state.ipfsHash = file.hash
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
			setLobaQuestions(context) {
				context.commit('setLobaQuestions')
			},
			addLobaQuestion(context, payload) {
				context.commit('addLobaQuestion', payload)
			},
			voteLobaQuestion(context, payload) {
				context.commit('voteLobaQuestion', payload)
			},
			getQuestionsByVote(context) {
				return context.getters.getQuestionsByVote
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
			async addForm(context) {
				await context.commit('addForm')
			},
			async getTokenName() {
				return await aNFC.methods.name().call({ from: account })
			},
			async mintCase(context) {
				await context.dispatch('addForm')

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

				console.log(
					'Transaction successful!',
					context.state.txHash,
					context.state.ipfsHash
				)
				return receipt
			},
			async getUsersCases() {
				const casesArr = await aNFC.methods
					.tokensOf(tokenAddress)
					.call({ from: account })
				console.log(`casesArr: ${casesArr}`)
				return casesArr
			},
			async getCaseHash(payload) {
				payload = 2
				const caseHash = await aNFC.methods
					.getIpfsHash(payload)
					.call({ from: account })
				console.log(caseHash)
				return caseHash
			},
			async caseHashToData(payload) {
				payload = 'QmNsyBaxTHoJtdKcHh85tM2QUE9SBCVxyW8DWVGvDQUdQy'
				await ipfs.files.cat(payload, function(err, file) {
					if (err) {
						throw err
					}
					console.log(file.toString('utf8'))
				})
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
