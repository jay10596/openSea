/* eslint-disable no-undef */
const OpenSea = artifacts.require("OpenSea")

// Required for Failure tests (should.be.rejected)
require('chai')
    .use(require('chai-as-promised'))
    .should()

// Equivalent to [accounts[0], accounts[1], accounts[2]] 
contract(OpenSea, ([deployer, owner, buyer]) => {
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

    describe('Owner mints a NFT', async () => {
        before(async () => {
            result = await openSea.mintNFT('Bored Ape #42', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', web3.utils.toWei('2', 'Ether'), collectionCount, { from: owner })
            event = result.logs[0].args
            
            nftCount = await openSea.nftCount()
            block = await web3.eth.getBlock('latest')
        })

        describe('Success:', async () => {
            it('should update product count/id', async () => {
                assert.equal(nftCount, 1)            
                assert.equal(event.id.toNumber(), nftCount.toNumber(), 'has incremented ID')          
            })

            it('should have a name and media', async () => {
                assert.equal(event.name, 'Bored Ape #42', 'name is correct')
                assert.equal(event.mediaHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has media in Hash')
            })
                
            it('should have a price', async () => {
                assert.equal(Number(event.price), web3.utils.toWei('2', 'Ether'), 'has a price in ETH')
            })

            it('should have a owner', async () => {
                assert.equal(event.owner, owner, 'has an owner')
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
                await openSea.mintNFT('', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', web3.utils.toWei('2', 'Ether'), collectionCount, { from: owner }).should.be.rejected 
                await openSea.mintNFT('Bored Ape #42', '', web3.utils.toWei('2', 'Ether'), collectionCount, { from: owner }).should.be.rejected 

                assert.equal(nftCount, 1)
            })

            it('should NOT have <= 0 price', async () => {
                await openSea.mintNFT('Bored Ape #42', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 0, collectionCount, { from: owner }).should.be.rejected 
                
                assert.equal(nftCount, 1)
            })


            it('should NOT have owner as the buyer', async () => {
                await openSea.mintNFT('Bored Ape #42', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', web3.utils.toWei('1', 'Ether'), { from: owner }).should.be.rejected 
                
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

            it('should have a name and media', async () => {
                assert.equal(nft.name, 'Bored Ape #42', 'name is correct')
                assert.equal(nft.mediaHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has media in Hash')
            })
                
            it('should have a price', async () => {
                assert.equal(nft.price, web3.utils.toWei('2', 'Ether'), 'has a price in ETH')
            })

            it('should have a owner', async () => {
                assert.equal(nft.owner, owner, 'has an owner')
            })
        })
        
        describe('Failure:', async () => {
            it('should NOT have invalid ID', async () => {
                nft = await openSea.nfts(99) 

                assert.equal(nft.name, '', 'has no name')
            })
        })
    })

    describe('Buyer purchases a NFT', async () => {
        let nft, ownerOldBalance, buyerOldBalance

        before(async () => {
            // Before purchasing
            ownerOldBalance = await web3.eth.getBalance(owner)
            buyerOldBalance = await web3.eth.getBalance(buyer)
            nft = await openSea.nfts(nftCount)

            result = await openSea.purchaseNFT(nftCount, { from: buyer, value: web3.utils.toWei('2', 'Ether') })
            event = result.logs[0].args

            block = await web3.eth.getBlock('latest')
        })

        describe('Success:', async () => {
            it('should pay the previous owner', async () => {
                assert.isTrue(Number(await web3.eth.getBalance(owner)) > Number(ownerOldBalance), 'Owner wallet balance has increased')
                assert.equal(Number(await web3.eth.getBalance(owner)), (Number(ownerOldBalance) + Number(web3.utils.toWei('2', 'Ether'))), 'Owner has been paid the full amount'),
                assert.isTrue(Number(await web3.eth.getBalance(buyer)) < Number(buyerOldBalance), 'Buyer wallet balance is decreased')            
            })

            it('should transfer ownership', async () => {
                assert.equal(event.owner, buyer, 'has transfered ownership to the buyer')
            })

            // Minter remains the same

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

    describe('Buyer sells a purchased NFT', async () => {
        let nft, ownerOldBalance, buyerOldBalance

        before(async () => {
            // Before purchasing
            ownerOldBalance = await web3.eth.getBalance(owner)
            buyerOldBalance = await web3.eth.getBalance(buyer)
            nft = await openSea.nfts(nftCount)

            result = await openSea.purchaseNFT(nftCount, { from: buyer, value: web3.utils.toWei('2', 'Ether') })
            event = result.logs[0].args

            block = await web3.eth.getBlock('latest')
        })

        describe('Success:', async () => {
            it('should pay the previous owner', async () => {
                assert.isTrue(Number(await web3.eth.getBalance(owner)) > Number(ownerOldBalance), 'Owner wallet balance has increased')
                assert.equal(Number(await web3.eth.getBalance(owner)), (Number(ownerOldBalance) + Number(web3.utils.toWei('2', 'Ether'))), 'Owner has been paid the full amount'),
                assert.isTrue(Number(await web3.eth.getBalance(buyer)) < Number(buyerOldBalance), 'Buyer wallet balance is decreased')            
            })

            it('should transfer ownership', async () => {
                assert.equal(event.owner, buyer, 'has transfered ownership to the buyer')
            })

            // Minter remains the same

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
            result = await openSea.createCollection('Bored Ape', 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', { from: owner })
            event = result.logs[0].args

            collectionCount = await openSea.collectionCount()
        })

        describe('Success:', async () => {
            it('should update product count/id', async () => {
                assert.equal(collectionCount, 2)        
                assert.equal(event.id.toNumber(), collectionCount.toNumber(), 'has incremented ID')
            })

            it('should have a name and media', async () => {
                assert.equal(event.name, 'Bored Ape', 'name is correct')
                assert.equal(event.mediaHash, 'QmfMcrTEwmHVZ32Za91corCmtofVJ1dri722oUT3bhaQsX', 'has media in Hash')
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