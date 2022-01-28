import React, { useEffect }  from 'react';
import Web3 from 'web3';
import Marketplace from '../build/Marketplace.json';
import { useDispatch, useSelector } from 'react-redux';
import { setMarketplace } from '../helpers/reducers/Marketplace'
import Router from '../helpers/router';

import Header from './sections/Header';
import Loading from './reusables/Loader';
import Footer from './sections/Footer';

// Can't use Redux hooks in a class component
function App() {    
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme)
    const marketplace = useSelector((state) => state.marketplace.value)

    // Equivalent to componentWillMount()
    useEffect(() => {
        loadWeb3()
        loadBlockchainData()
    })

    const loadWeb3 = async () => {
        // Modern dapp broswers
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.eth_requestAccounts
        }
        // Lagacy dapp broswers
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        // No-dapp broswers
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async () => {
        const account = await window.web3.eth.getAccounts() /* Use await while calling a function */
        const netId = await window.web3.eth.net.getId()

        // Check if smart contract is deployed to correct network(Ganache) 
        if(Marketplace.networks[netId]) {
            const marketplace = new window.web3.eth.Contract(Marketplace.abi, Marketplace.networks[netId].address)

            const collectionCount = await marketplace.methods.collectionCount().call() /* https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#id26 */
            const collections = []

            for(var j = 1; j <= collectionCount; j++) {
                const collection = await marketplace.methods.collections(j).call()
                collections.push(collection)
            }

            const productCount = await marketplace.methods.productCount().call()
            const products = []

            for(var i = 1; i <= productCount; i++) {
                const product = await marketplace.methods.products(i).call()
                products.push(product)
            }

            dispatch(setMarketplace({ 
                account: account[0],
                marketplace: marketplace,
                collectionCount: collectionCount,
                collections: collections,
                productCount: productCount,
                products: products,
                loading: false
            }))
        } else {
            window.alert('Smart contract not deployed to detected network')
        }
    }

    return (
        <div className="App" >
            <Header account={marketplace.account} themeColor={theme.color} />

            {marketplace.loading 
                ? <Loading />
                : <Router />                    
            }
        
            <Footer />
        </div>
    )
}

export default App;