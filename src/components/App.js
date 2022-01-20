import React, { Component }  from 'react';
import Web3 from 'web3';

class App extends Component {
    async componentDidMount() {
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
        const web3 = window.web3
        const account = await web3.eth.getAccounts()

        this.setState({ account: account })
    }

    constructor(props) {
        super(props)

        this.state = {
            account: '',
            counter: 0,
            products: [],
            loading: true
        }
    }

    render() {
        return (
            <div className="App" >
                <header>

                </header>

                <main>Marketplace Address: {this.state.account}</main>

                <footer></footer>
            </div>
        )
    }
}

export default App;