import React, { Component }  from 'react';
import Web3 from 'web3';

import Marketplace from '../build/Marketplace.json';
import Main from './sections/Main';


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
            const counter = await marketplace.methods.counter().call() /* https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#id26 */

            for(var i = 1; i <= counter; i++) {
                const product = await marketplace.methods.products(i).call()
                this.setState({ products: [...this.state.products, product] })
            }

            this.setState({ marketplace: marketplace })
            this.setState({ loading: false })
            this.setState({ counter: counter })
        } else {
            window.alert('Smart contract not deployed to detected network')
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            account: '',
            counter: 0,
            marketplace: [],
            products: [],
            loading: true
        }

        // Bind functions
        this.createProduct = this.createProduct.bind(this)
        this.purchaseProduct = this.purchaseProduct.bind(this)
    }

    createProduct(name, price) {
        this.setState({ loading: true })

        this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account }) /* https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#id26 */
            .on('receipt', (receipt) => {
                this.setState({ loading: false })
            })
    }

    purchaseProduct(id, price) {
        this.setState({ loading: true })

        this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price }) /* https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#id26 */
            .on('receipt', (receipt) => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div className="App" >
                <header>
                    Marketplace Address: {this.state.account}
                </header>

                {/* Pass state variable and function as prop */}
                {this.state.loading 
                ? 'loading' 
                : <Main 
                    products={this.state.products} 
                    createProduct={this.createProduct} 
                    purchaseProduct={this.purchaseProduct} 
                />
                }
            
                <footer></footer>
            </div>
        )
    }
}

export default App;