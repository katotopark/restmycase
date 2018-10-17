import Vuex from 'vuex'
import web3 from '~/plugins/web3'
import web3Abi from 'web3-eth-abi'
import NonFungibleCase from '../../build/contracts/NonFungibleCase'
import * as questions_0 from './questionsDefault'

const IPFS = require('ipfs-api')
// const ipfs = IPFS('ipfs.infura.io', '5001', { protocol: 'https' })
const ipfs = IPFS()

const tokenAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'
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
			totalScore: 0,
			ipfsHash: '',
			txHash: '',
			blockHash: '',
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
			setQuestions(state) {
				state.questionsArray = questions_0.map(item => {
					let output = {
						value: `${item.value}?`,
						group: item.group,
						voteCount: item.voteCount
					}
					return output
				})
			},
			addQuestion(state, payload) {
				state.questionsArray.push(payload)
			},
			voteQuestion(state, payload) {
				state.questionsArray[payload].voteCount++
			},
			formatLobaQuestions(state) {
				const qHeader = 'On a scale from 1 to 5, '
				state.questionsArray.forEach(item => {
					item.value = `${qHeader} ${item.value}`
				})
			},
			updateScore(state, payload) {
				state.totalScore += payload
			},
			resetHash(state, payload) {
				state.ipfsHash = payload
			},
			confirmTx(state, payload) {
				state.txHash = payload.txHash
				state.blockHash = payload.blockHash
				state.txArray.push(payload.txHash)
			},
			randomNum(state) {
				state.formObj.tDistance = (Math.random() * 10).toFixed(2)
				state.formObj.tDuration = (Math.random() * 5).toFixed(2)
			},
			setLobas(state, payload) {
				let group = state.formObj.lobas[payload.group]
					? state.formObj.lobas[payload.group]
					: {}

				group[payload.id] = payload.score
				state.formObj.lobas[payload.group] = group
			},
			describeCase(state, payload) {
				state.formObj.caseName = payload.caseName
				state.formObj.caseDescription = payload.caseDescription
			}
		},
		actions: {
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
			updateScore(context, payload) {
				console.log('new score is: ', context.state.totalScore)
				context.commit('updateScore', payload)
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
			async mintComposed(context) {
				await context.dispatch('addForm')
				context.dispatch('mintCase')
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
			async mintCase(context) {
				let account = await getAccount()

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
				console.log(`nonce for [${account}] is ${nonce}`)

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

				await context.commit('confirmTx', {
					txHash: receipt.transactionHash,
					blockHash: receipt.blockHash
				})

				console.log('Transaction successful!')
				// console.log(`txHash: ${receipt.transactionHash}`)
				console.log(receipt)

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
			async getCaseId(context, payload) {
				let account = await getAccount()
				const caseId = await aNFC.methods
					.getToken(payload)
					.call({ from: account })
				return caseId
			},
			async caseHashToData(context, payload) {
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
