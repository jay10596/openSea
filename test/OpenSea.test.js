/* eslint-disable no-undef */
const OpenSea = artifacts.require("OpenSea")

// Required for Failure tests (should.be.rejected)
require('chai')
    .use(require('chai-as-promised'))
    .should()

// Equivalent to [accounts[0], accounts[1], accounts[2]] 
contract(OpenSea, ([deployer, minter, owner, buyer]) => {
    let openSea, nftCount, collectionCount, result, event

    before(async () => {
        accounts = await web3.eth.getAccounts()
        openSea = await OpenSea.deployed()
    })

    describe('OpenSea smart contract is deployed', () => {
        let collection, address, name, block

        before(async () => {
            collectionCount = await openSea.collectionCount()
            collection = await openSea.collections(collectionCount)
            address = await openSea.address
            name = await openSea.name()
        })

        it('should have an address', async () => {
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('should have a name', async () => {
            assert.equal(name, 'OpenSea')
            assert.notEqual(name, 0x0)
            assert.notEqual(name, '')
            assert.notEqual(name, null)
            assert.notEqual(name, undefined)
        })

        it('should have a default collection', async () => {
            assert.equal(collectionCount, 1, 'has a collection')
            assert.equal(collection.name, 'Default', 'has a name')
            assert.equal(collection.mediaHash, '', 'has no image')
            assert.equal(collection.owner, deployer, 'has address of deployer')
        })
    })

    describe('Minter mints a NFT', async () => {
        before(async () => {
            result = await openSea.mintNFT('Bored Ape #42', 'This is a stupid looking monkey', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', web3.utils.toWei('2', 'Ether'), collectionCount, { from: minter })
            event = result.logs[0].args
            
            nftCount = await openSea.nftCount()
            block = await web3.eth.getBlock('latest')
        })

        describe('Success:', async () => {
            it('should update product count/id', async () => {
                assert.equal(nftCount, 1)            
                assert.equal(event.id.toNumber(), nftCount.toNumber(), 'has incremented ID')          
            })

            it('should have a name, description and media', async () => {
                assert.equal(event.name, 'Bored Ape #42', 'name is correct')
                assert.equal(event.description, 'This is a stupid looking monkey', 'name is correct')
                assert.equal(event.mediaHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has media in Hash')
            })
                
            it('should have a price', async () => {
                assert.equal(Number(event.price), web3.utils.toWei('2', 'Ether'), 'has a price in ETH')
            })

            it('should have the same and minter owner', async () => {
                assert.equal(event.minter, minter, 'has a minter')
                assert.equal(event.owner, minter, 'has an owner')
            })

            it('should have 0 traded volume', async () => {
                assert.equal(event.volume_traded, 0, 'has not been traded yet')
            })

            it('should have a timestamp', async () => {
                assert.equal(Number(event.timestamp), Number(block.timestamp), 'has a timestamp')
                assert.isTrue(Number(event.timestamp) > 0)
            })
        })
        
        describe('Failure:', async () => {
            it('should NOT have empty name or media', async () => {
                await openSea.mintNFT('', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', web3.utils.toWei('2', 'Ether'), collectionCount, { from: minter }).should.be.rejected 
                await openSea.mintNFT('Bored Ape #42', '', web3.utils.toWei('2', 'Ether'), collectionCount, { from: minter }).should.be.rejected 

                assert.equal(nftCount, 1)
            })

            it('should NOT have <= price', async () => {
                await openSea.mintNFT('Bored Ape #42', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 1, collectionCount, { from: minter }).should.be.rejected 
                
                assert.equal(nftCount, 1)
            })


            it('should NOT have owner as the buyer', async () => {
                await openSea.mintNFT('Bored Ape #42', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', web3.utils.toWei('2', 'Ether'), { from: minter }).should.be.rejected 
                
                assert.equal(nftCount, 1)
            })
        })
    })

    describe('Store fetches/displays a product', async () => {
        let nft

        before(async () => {
            nft = await openSea.nfts(nftCount) 
        })

        describe('Success:', async () => {
            it('should have correct count/id', async () => {
                assert.equal(nft.id.toNumber(), nftCount.toNumber(), 'has incremented ID')          
            })

            it('should have a name, description and media', async () => {
                assert.equal(nft.name, 'Bored Ape #42', 'name is correct')
                assert.equal(event.description, 'This is a stupid looking monkey', 'name is correct')
                assert.equal(nft.mediaHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has media in Hash')
            })
                
            it('should have a price', async () => {
                assert.equal(nft.price, web3.utils.toWei('2', 'Ether'), 'has a price in ETH')
            })

            it('should have a minter and a owner', async () => {
                assert.equal(nft.minter, minter, 'has a minter')
                assert.equal(nft.owner, minter, 'has an owner')
            })
        })
        
        describe('Failure:', async () => {
            it('should NOT have invalid ID', async () => {
                nft = await openSea.nfts(99) 

                assert.equal(nft.name, '', 'has no name')
            })
        })
    })

    describe('Owner owns a NFT', async () => {
        let nft, minterOldBalance, ownerOldBalance, commission, royalty, price

        before(async () => {
            // Before purchasing
            nft = await openSea.nfts(nftCount)            
            minterOldBalance = await web3.eth.getBalance(minter)
            ownerOldBalance = await web3.eth.getBalance(owner)

            // Owner purchases minted NFT
            result = await openSea.purchaseNFT(nftCount, { from: owner, value: Number(event.price) })
            event = result.logs[0].args

            commission = Number(event.price) / 40 
            royalty = Number(event.price) / 20
            price = Number(event.price) - (commission + royalty)
            block = await web3.eth.getBlock('latest')
        })

        describe('Success:', async () => {
            it('should pay service fee to the OpenSea', async () => {
                assert.isTrue(Number(await web3.eth.getBalance(openSea.address)) > 0, 'OpenSea wallet balance has increased')
                assert.equal(Number(await web3.eth.getBalance(openSea.address)), commission, 'OpenSea has been paid 2.5% Service fee')
            })

            it('should pay royalty and remaining price to the previous owner/minter', async () => {
                assert.isTrue(Number(await web3.eth.getBalance(minter)) > Number(minterOldBalance), 'Minter wallet balance has increased')
                assert.equal(Number(await web3.eth.getBalance(event.minter)), Number(minterOldBalance) + price + royalty, 'Minter has been paid 5% royalty')
                assert.isTrue(Number(await web3.eth.getBalance(owner)) < Number(ownerOldBalance), 'Owner wallet balance is decreased')            
            })

            it('should transfer ownership', async () => {
                assert.equal(event.owner, owner, 'has transfered ownership to the owner')
            })

            it('should not update the minter', async () => {
                assert.equal(event.minter, minter, 'has the same minter')
            })

            it('should update traded volume', async () => {
                assert.equal(Number(event.volume_traded), 1, 'has updated traded volume')
                assert.isTrue(Number(event.volume_traded) > Number(nft.volume_traded), 'has increased traded volume than before')
            })

            it('should update timestamp', async () => {
                assert.equal(Number(event.timestamp), Number(block.timestamp), 'has updated timestamp')
                assert.isTrue(Number(event.timestamp) > Number(nft.timestamp), 'has much more recent timestamp')
            })
        })
        
        describe('Failure:', async () => {
            it('should NOT have invalid ID', async () => {
                await openSea.purchaseNFT(99, { from: owner, value: web3.utils.toWei('2', 'Ether') }).should.be.rejected

                assert.equal(nftCount, 1)
            })

            it('should NOT have insufficient ETH in buyer account', async () => {
                await openSea.purchaseNFT(nftCount, { from: owner, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected
                
                assert.equal(nftCount, 1)
            })

            it('should NOT let the owner buy his own NFT', async () => {
                await openSea.purchaseNFT(nftCount, { from: owner, value: web3.utils.toWei('2', 'Ether') }).should.be.rejected
                
                assert.equal(nftCount, 1)
            })
        })
    })

    describe('Buyer purchases a NFT', async () => {
        let nft, minterOldBalance, ownerOldBalance, buyerOldBalance, commission, royalty, price

        before(async () => {
            // Before purchasing
            nft = await openSea.nfts(nftCount)            
            minterOldBalance = await web3.eth.getBalance(minter)
            ownerOldBalance = await web3.eth.getBalance(owner)
            buyerOldBalance = await web3.eth.getBalance(buyer)

            // 1st Owner sells it to another buyer
            result = await openSea.purchaseNFT(nftCount, { from: buyer, value: Number(event.price) })
            event = result.logs[0].args

            commission = Number(event.price) / 40 
            royalty = Number(event.price) / 20
            price = Number(event.price) - (commission + royalty)
            block = await web3.eth.getBlock('latest')
        })

        describe('Success:', async () => {
            it('should pay service fee to the OpenSea', async () => {
                assert.isTrue(Number(await web3.eth.getBalance(openSea.address)) > 0, 'OpenSea wallet balance has increased')
                assert.equal(Number(await web3.eth.getBalance(openSea.address)), commission + commission, 'OpenSea has been paid 2.5% Service fee twice')
            })

            it('should pay royalty to the minter', async () => {
                assert.equal(Number(await web3.eth.getBalance(event.minter)), Number(minterOldBalance) + royalty, 'Minter has been paid 5% royalty')
            })

            it('should pay remaining price to the previous owner', async () => {
                assert.isTrue(Number(await web3.eth.getBalance(owner)) > Number(ownerOldBalance), 'Owner wallet balance has increased')
                assert.equal(Number(await web3.eth.getBalance(owner)), Number(ownerOldBalance) + price, 'Owner has been paid the remaining price amount'),
                assert.isTrue(Number(await web3.eth.getBalance(buyer)) < Number(buyerOldBalance), 'Buyer wallet balance is decreased')            
            })

            it('should transfer ownership', async () => {
                assert.equal(event.owner, buyer, 'has transfered ownership to the buyer')
            })

            it('should not update the minter', async () => {
                assert.equal(event.minter, minter, 'has the same minter')
            })

            it('should update traded volume', async () => {
                assert.equal(Number(event.volume_traded), 2, 'has updated traded volume')
                assert.isTrue(Number(event.volume_traded) > Number(nft.volume_traded), 'has increased traded volume than before')
            })

            it('should update timestamp', async () => {
                assert.equal(Number(event.timestamp), Number(block.timestamp), 'has updated timestamp')
                assert.isTrue(Number(event.timestamp) > Number(nft.timestamp), 'has much more recent timestamp')
            })
        })
        
        describe('Failure:', async () => {
            it('should NOT have invalid ID', async () => {
                await openSea.purchaseNFT(99, { from: buyer, value: web3.utils.toWei('2', 'Ether') }).should.be.rejected

                assert.equal(nftCount, 1)
            })

            it('should NOT have insufficient ETH in buyer account', async () => {
                await openSea.purchaseNFT(nftCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected
                
                assert.equal(nftCount, 1)
            })

            it('should NOT let the owner buy his own NFT', async () => {
                await openSea.purchaseNFT(nftCount, { from: buyer, value: web3.utils.toWei('2', 'Ether') }).should.be.rejected
                
                assert.equal(nftCount, 1)
            })
        })
    })

    describe('Owner creates another collection', async () => {
        before(async () => {
            result = await openSea.createCollection('Bored Ape', 'This is a Bored Ape Yatch Club collection','QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', { from: owner })
            event = result.logs[0].args

            collectionCount = await openSea.collectionCount()
        })

        describe('Success:', async () => {
            it('should update product count/id', async () => {
                assert.equal(collectionCount, 2)        
                assert.equal(event.id.toNumber(), collectionCount.toNumber(), 'has incremented ID')
            })

            it('should have a name, description and hash', async () => {
                assert.equal(event.name, 'Bored Ape', 'has a name')
                assert.equal(event.description, 'This is a Bored Ape Yatch Club collection', 'has media in Hash')
                assert.equal(event.mediaHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has media in Hash')
                assert.equal(event.coverHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has cover media in Hash')
            })
                
            it('should have a owner', async () => {
                assert.equal(event.owner, owner, 'has an owner')
            })
        })
        
        describe('Failure:', async () => {
            it('should NOT have empty name', async () => {
                await openSea.createCollection('', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', { from: owner }).should.be.rejected 

                assert.equal(collectionCount, 2)
            })
        })
    })

    describe('Website fetches/displays a collection', async () => {
        let collection

        before(async () => {
            collection = await openSea.collections(collectionCount) // Last collection
        })

        describe('Success:', async () => {
            it('should have correct count/id', async () => {
                assert.equal(collection.id.toNumber(), collectionCount.toNumber(), 'has incremented ID')          
            })

            it('should have a name and media', async () => {
                assert.equal(collection.name, 'Bored Ape', 'name is correct')
                assert.equal(collection.mediaHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has media in Hash')
            })

            it('should have a owner', async () => {
                assert.equal(collection.owner, owner, 'has an owner')
            })
        })
        
        describe('Failure:', async () => {
            it('should NOT have invalid ID', async () => {
                collection = await openSea.collections(99) 

                assert.equal(collection.name, '', 'has no name')
            })
        })
    })
})