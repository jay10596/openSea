/* eslint-disable no-undef */
const Marketplace = artifacts.require("Marketplace");

// Required for Failure tests (should.be.rejected)
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract(Marketplace, ([deployer, seller, buyer]) => {
    let marketplace

    before(async() => {
        accounts = await web3.eth.getAccounts();
        marketplace = await Marketplace.deployed()
    })

    describe('Marketplace', () => {
        it('deployed successfully', async () => {
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
        let result, productCount

        before(async () => {
            result = await marketplace.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), { from: seller })
            productCount = await marketplace.counter()
        })

        // SUCCESS
        it('created successfully', async () => {
            const event = result.logs[0].args

            assert.equal(productCount, 1)            
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'iPhone X', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.purchased, '', 'purchased is correct')
        })

        // FAILURE
        it('not created successfully', async () => {
            // These tests will fail because in the contract, we've require() for these params 
            await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected 
            await marketplace.createProduct('iPhone X', 0, { from: seller }).should.be.rejected 
        })   
    })
})