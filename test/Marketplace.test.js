/* eslint-disable no-undef */
const Marketplace = artifacts.require("Marketplace");

contract(Marketplace, (accounts) => {
    let marketplace

    before(async() => {
        marketplace = await Marketplace.deployed()
    })

    describe('Marketplace Test', () => {
        it('deploys successfully', async() => {
            const address = await marketplace.address

            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await marketplace.name()

            assert.equal(name, 'Jay Modi')
            assert.notEqual(name, 0x0)
            assert.notEqual(name, '')
            assert.notEqual(name, null)
            assert.notEqual(name, undefined)
        })
    })
})