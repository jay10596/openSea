/* eslint-disable no-undef */
const Marketplace = artifacts.require("Marketplace")

// Required for Failure tests (should.be.rejected)
require('chai')
    .use(require('chai-as-promised'))
    .should()

// Equivalent to [accounts[0], accounts[1], accounts[2]] 
contract(Marketplace, ([deployer, owner, buyer]) => {
    let marketplace

    before(async() => {
        accounts = await web3.eth.getAccounts()
        marketplace = await Marketplace.deployed()
    })

    describe('Marketplace', () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address

            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await marketplace.name()

            assert.equal(name, 'Exotique Marketplace')
            assert.notEqual(name, 0x0)
            assert.notEqual(name, '')
            assert.notEqual(name, null)
            assert.notEqual(name, undefined)
        })
    })

    describe('Products', () => {
        let result, counter

        it('creates product', async () => {
            // Create Product
            result = await marketplace.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), { from: owner })
            counter = await marketplace.counter()
            
            const event = result.logs[0].args

            // SUCCESS: Product created successfully
            assert.equal(counter, 1)            
            assert.equal(event.id.toNumber(), counter.toNumber(), 'id is correct')
            assert.equal(event.name, 'iPhone X', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, owner, 'owner is correct')
            assert.equal(event.purchased, false, 'purchased is correct')

            // FAILURE: Product couldn't be created with missing params 
            /*
             * Metadata is called msg
             * These tests will fail because in the contract, we've require() for these params
             */
            await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: owner }).should.be.rejected 
            await marketplace.createProduct('iPhone X', 0, { from: owner }).should.be.rejected 
        })

        it('displays product', async () => {
            // Fetch Product
            product = await marketplace.products(counter)
                        
            // SUCCESS: Product displayed successfully
            assert.equal(product.id.toNumber(), counter.toNumber(), 'id is correct')
            assert.equal(product.name, 'iPhone X', 'name is correct')
            assert.equal(product.price, '1000000000000000000', 'price is correct')
            assert.equal(product.owner, owner, 'owner is correct')
            assert.equal(product.purchased, false, 'purchased is correct')
        })

        it('purchases product', async () => {
            let ownerOldBalance, ownerNewBalance, price

            // Owner's balance before purchase
            ownerOldBalance = await web3.eth.getBalance(owner)
            ownerOldBalance = new web3.utils.BN(ownerOldBalance)

            // Update Product
            result = await marketplace.purchaseProduct(counter, { from: buyer, value: web3.utils.toWei('2', 'Ether') })
            const event = result.logs[0].args

            // SUCCESS: Product purchased successfully
            assert.equal(counter, 1)            
            assert.equal(event.id.toNumber(), counter.toNumber(), 'id is correct')
            assert.equal(event.name, 'iPhone X', 'name is correct')
            assert.equal(event.price, '2000000000000000000', 'price is correct')
            assert.equal(event.owner, buyer, 'owner is correct')
            assert.equal(event.purchased, true, 'purchased is correct')

            // Owner's balance after purchase
            ownerNewBalance = await web3.eth.getBalance(owner)
            ownerNewBalance = new web3.utils.BN(ownerNewBalance)

            // SUCCESS: Owner received payment successfully
            price = web3.utils.toWei('2', 'Ether')
            price = new web3.utils.BN(price)
            const updatedBalance = ownerOldBalance.add(price)

            assert.equal(ownerNewBalance.toString(), updatedBalance.toString())

            // FAILURE: Product didn't have valid id
            await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('2', 'Ether') }).should.be.rejected

            // FAILURE: There wasn't enough ETH in transation
            await marketplace.purchaseProduct(counter, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected

            // FAILURE: Buyer was the owner
            await marketplace.purchaseProduct(counter, { from: owner, value: web3.utils.toWei('2', 'Ether') }).should.be.rejected
        })  
    })
})