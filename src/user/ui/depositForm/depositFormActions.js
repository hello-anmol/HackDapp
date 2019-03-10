import store from '../../../store'
import SimpleStore from "../../../../build/contracts/SimpleStore.json";
const contract = require('truffle-contract')

export const ADDRESS_STORED = 'ADDRESS_STORED'
function addressStored(tx) {
    return {
        type: ADDRESS_STORED,
        payload: tx
    }
}

export function storeAddress(num) {
    let web3 = store.getState().web3.web3Instance

    if (typeof web3 !== 'undefined') {
        console.log("calld");

        return function (dispatch) {
            const simpleStore = contract(SimpleStore)
            simpleStore.setProvider(web3.currentProvider)

            var simplestorageInstance;

            web3.eth.getCoinbase((error, coinbase) => {
                if (error) {
                    console.error(error);
                }

                simpleStore.deployed().then(function (instance) {
                    simplestorageInstance = instance

                    simplestorageInstance.set(num, { from: coinbase })
                        .then(function (result) {
                            const { tx } = result;
                            console.log('tx', tx);
                            web3.eth.getTransactionReceipt(tx.toString(), (err, res) => { if (err) throw err; else console.log(res)})
                        simplestorageInstance.get({ from: coinbase })
                        .then((result) => {
                            console.log("Get(): " + result);
                            let val = result;
                            
                            return alert('Added Deposited :' + val + '  updated!')
                        })
                            dispatch(addressStored(tx))

                        })
                        .catch(function (result) {
                            console.log("err:" + result);

                        })
                }).catch(err => {
                    console.log(err);
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}
