import React, { Component }  from 'react';
import Web3 from 'web3';
import Marketplace from '../build/Marketplace.json';

import Header from './sections/Header';
import Loading from './reusables/Loader';
import Router from './Router';
import Footer from './sections/Footer';

export const MarketplaceContext = React.createContext();

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        // Modern dapp broswers
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
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

    async loadBlockchainData() {
        const account = await window.web3.eth.getAccounts() /* Use await while calling a function */
        const netId = await window.web3.eth.net.getId()

        this.setState({ account: account[0] })

        // Check if smart contract is deployed to correct network(Ganache) 
        if(Marketplace.networks[netId]) {
            const marketplace = new window.web3.eth.Contract(Marketplace.abi, Marketplace.networks[netId].address)
            const productCount = await marketplace.methods.productCount().call() /* https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#id26 */
            const collectionCount = await marketplace.methods.collectionCount().call()

            for(var i = 1; i <= productCount; i++) {
                const product = await marketplace.methods.products(i).call()
                this.setState({ products: [...this.state.products, product] })
            }

            for(var j = 1; j <= collectionCount; j++) {
                const collection = await marketplace.methods.collections(j).call()
                this.setState({ collections: [...this.state.collections, collection] })
            }

            this.setState({ marketplace: marketplace })
            this.setState({ productCount: productCount })
            this.setState({ collectionCount: collectionCount })
            this.setState({ loading: false })
        } else {
            window.alert('Smart contract not deployed to detected network')
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            account: '',
            marketplace: [],
            productCount: 0,
            collectionCount: 0,
            products: [],
            collections: [],
            loading: true
        }

        // Bind functions
        this.createProduct = this.createProduct.bind(this)
        this.purchaseProduct = this.purchaseProduct.bind(this)
        this.createCollection = this.createCollection.bind(this)
    }

    createProduct(name, price, collection_id) {
        this.setState({ loading: true })

        this.state.marketplace.methods.createProduct(name, price, collection_id).send({ from: this.state.account }) /* https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#id26 */
            .on('receipt', (receipt) => {
                this.setState({ loading: false })
            })
    }

    purchaseProduct(id, price) {
        this.setState({ loading: true })

        this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
            .on('receipt', (receipt) => {
                this.setState({ loading: false })
            })
    }

    createCollection(name) {
        this.setState({ loading: true })

        this.state.marketplace.methods.createCollection(name).send({ from: this.state.account })
            .on('receipt', (receipt) => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div className="App" >
                <Header account={this.state.account} />

                {/* Pass state variable and function as prop */}
                {this.state.loading 
                    ? <Loading />
                    : <MarketplaceContext.Provider value={{ 
                        account: this.state.account,
                        products: this.state.products, 
                        collections: this.state.collections,
                        createProduct: this.createProduct,
                        purchaseProduct: this.purchaseProduct,
                        createCollection: this.createCollection
                    }}>
                        <Router />
                    </MarketplaceContext.Provider> 
                }
            
                <Footer />
            </div>
        )
    }
}

export default App;