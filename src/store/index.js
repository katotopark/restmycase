import Vuex from 'vuex'
import web3 from '~/plugins/web3'
import web3Abi from 'web3-eth-abi'
import NonFungibleCase from '../../build/contracts/NonFungibleCase'
// import AutonomousQuestionPool from '../../build/contracts/AutonomousQuestionPool'
import * as questions_0 from './questionsDefault'
import * as locations_0 from './locationsDefault'

const IPFS = require('ipfs-api')
// const ipfs = IPFS('ipfs.infura.io', '5001', { protocol: 'https' })
const ipfs = IPFS()

const tokenAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'
const aNFC = new web3.eth.Contract(NonFungibleCase.abi, tokenAddress)

// const aqpTokenAddress = '0x30753e4a8aad7f8597332e813735def5dd395028'
// const aAQP = new web3.eth.Contract(AutonomousQuestionPool.abi, aqpTokenAddress)

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
				caseClass: '',
				tDistance: '',
				tDuration: '',
				lobas: {},
				caseImage: null,
				totalScore: 0
			},
			qObj: {
				value: '',
				group: '',
				voteCount: 0
			},
			locObj: {
				name: '',
				address: '',
				class: ''
			},
			ipfsHash: '',
			txHash: '',
			blockHash: '',
			questionsArray: [],
			locationsArray: [],
			caseArray: [],
			txArray: [],
			userArray: [] // ERC721 => js filter for ownerOf
		},
		mutations: {
			initializeStore(state) {
				if (process.isClient && localStorage.getItem('store')) {
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
				state.formObj.totalScore += payload
			},
			setLocations(state) {
				state.locationsArray = locations_0.map(item => {
					let output = {
						name: item.name,
						address: item.address,
						class: item.class,
						voteCount: item.voteCount
					}
					return output
				})
			},
			addLocation(state, payload) {
				state.locationsArray.push(payload)
			},
			voteLocation(state, payload) {
				state.locationsArray[payload].voteCount++
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
				state.formObj.caseImage = payload.caseImage
				state.formObj.caseClass = payload.caseClass
			},
			inputQ(state, payload) {
				state.qObj.value = payload.value
				state.qObj.group = payload.group
				state.qObj.voteCount = payload.voteCount
			},
			inputLoc(state, payload) {
				state.locObj.name = payload.name
				state.locObj.address = payload.address
				state.locObj.class = payload.class
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
				console.log('new score is: ', context.state.formObj.totalScore)
				context.commit('updateScore', payload)
			},
			setLocations(context) {
				context.commit('setLocations')
			},
			addLocation(context, payload) {
				context.commit('addLocation', payload)
			},
			voteLocation(context, payload) {
				context.commit('voteLocation', payload)
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
			async addLoc(context, payload) {
				context.commit('inputLoc', payload)

				const contextBuffer = Buffer.from(JSON.stringify(context.state.locObj))
				return ipfs.files
					.add(contextBuffer)
					.then(res => {
						return res.map(file => {
							console.log(
								'Writing location to IPFS returned the hash',
								file.hash
							)
							console.log(context.state.locObj)
							return file.hash
						})
					})
					.catch(err => {
						return console.log('ipfs add fail', err)
					})
			},
			async addQ(context, payload) {
				context.commit('inputQ', payload)

				const contextBuffer = Buffer.from(JSON.stringify(context.state.qObj))
				return ipfs.files
					.add(contextBuffer)
					.then(res => {
						return res.map(file => {
							console.log(
								'Writing question to IPFS returned the hash',
								file.hash
							)
							console.log(context.state.qObj)
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
			/*async buyCase(unused_context, payload) {
				let account = '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef'

				const buyMethod = NonFungibleCase.abi.find(method => {
					return method.name === 'buyCase'
				})
				const buyMethodTxData = web3Abi.encodeFunctionCall(buyMethod, [payload])
				try {
					const estimateParameters = {
						from: account,
						to: tokenAddress,
						data: buyMethodTxData
					}
					console.log('Estimating gas, parameters:', estimateParameters)
					const estimateGas = await web3.eth.estimateGas(estimateParameters)
				} catch (e) {
					console.error('Estimating the gas amount threw an exception:\n', e)
					return
				}
				console.log('gettingn transaction count')
				const nonce = await web3.eth.getTransactionCount(account)

				console.log('sending transaction now')
				const receipt = await web3.eth.sendTransaction({
					from: account,
					to: tokenAddress,
					data: buyMethodTxData,
					value: 0,
					nonce: nonce,
					gas: estimateGas
				})
				console.log(receipt)
				return receipt

				console.log('Payload is', payload)
			},*/
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
