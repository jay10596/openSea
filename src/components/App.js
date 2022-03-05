import React, { useEffect }  from 'react';
import Web3 from 'web3';
import OpenSea from '../build/OpenSea.json';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSea } from '../helpers/reducers/OpenSea'
import Router from '../helpers/router';

import Header from './sections/Header';
import Loading from './reusables/Loader';
import Footer from './sections/Footer';

// Can't use Redux hooks in a class component
function App() {    
    const dispatch = useDispatch()

    // Fetch values from the store
    const user = useSelector((state) => state.openSea.value.user)
    const loading = useSelector((state) => state.openSea.value.loading)
    const theme = useSelector((state) => state.theme)

    // Equivalent to componentWillMount()
    useEffect(() => {
        loadWeb3()
        loadBlockchain()
    })

    // Check valid browser
    const loadWeb3 = async () => {
        // Modern dapp broswers
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.eth_requestAccounts
        }
        // Lagacy dapp broswers
        else if (window.web3) {
            window.web3 = new Web3(window.ethereum)
        }
        // No-dapp broswers
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    // Load Metamask and fetch data
    const loadBlockchain = async () => {
        if(typeof window.ethereum == 'undefined') {
            window.alert('Please install MetaMask')
        } else {
            const web3 = new Web3(window.ethereum) // Anything to do with web3 is related to MetaMask such as gettting balance
            const netId = await web3.eth.net.getId() // Network ID - eg: Kovan, Ganache etc.
            const account = await web3.eth.getAccounts() // Current logged in account - eg: ['0xji2817s82hs']
            
            if(typeof account[0] == 'undefined') {
                window.alert('Please login with MetaMask')
            } else {
                const openSea = new window.web3.eth.Contract(OpenSea.abi, OpenSea.networks[netId].address)

                // Fetch collections from Smart Contract
                const collections = []
                for(let i = 1; i <= await openSea.methods.collectionCount().call(); i++) {
                    collections.push(await openSea.methods.collections(i).call())
                }

                // Fetch NFTs from Smart Contract
                const nfts = []
                for(let i = 1; i <= await openSea.methods.nftCount().call(); i++) {
                    nfts.push(await openSea.methods.nfts(i).call())
                }

                dispatch(setOpenSea({ 
                    user: {
                        address: account[0],
                        eth: await web3.eth.getBalance(account[0]),
                    },
                    store: {
                        contract: openSea,
                        address: openSea._address,
                        eth: await web3.eth.getBalance(openSea._address),
                        nfts: nfts,
                        collections: collections
                    },
                    loading: false
                }))
            }
        }        
    }

    return (
        <div className="App" >
            <Header user={user} theme={theme} />

            {loading 
                ? <Loading />
                : <Router />                    
            }
        
            <Footer />
        </div>
    )
}

export default App;