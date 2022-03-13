// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OpenSea {
    // State variables
    string public name;
    uint public nftCount = 0; 
    uint public collectionCount = 0; 

    // Equivalent to database
    struct NFT {
        uint id;
        string name;
        string description;
        string mediaHash;
        uint price;
        address minter;
        address owner;
        uint volume_traded;
        uint timestamp;
        uint collection_id;
    }

    // Similar to declaring PK for adding data
    mapping(uint => NFT) public nfts;

    // Emit event when a NFT is created
    event NFTMinted(
        uint id,
        string name,
        string description,
        string mediaHash,
        uint price,
        address minter,
        address owner,
        uint volume_traded,
        uint timestamp,
        uint collection_id
    );

    // Emit event when a NFT is purchased
    event NFTPurchased(
        uint id,
        string name,
        string description,
        string mediaHash,
        uint price,
        address minter,
        address owner,
        uint volume_traded,
        uint timestamp,
        uint collection_id
    );

    // Equivalent to database
    struct Collection {
        uint id;
        string name;
        string description;
        string mediaHash;
        string coverHash;
        address owner;
    }

    // Similar to declaring PK for adding data
    mapping(uint => Collection) public collections;

    // Emit event when a collection is created
    event CollectionCreated(
        uint id,
        string name,
        string description,
        string mediaHash,
        string coverHash,
        address owner
    );

    constructor() {
        name = "OpenSea";

        // Create a default collection
        createCollection('Default', '', '', ''); 
    }

    function mintNFT(string memory _name, string memory _description, string memory _mediaHash, uint _price, uint _collection_id) public {
        // Validation
        require(bytes(_name).length > 0);
        require(bytes(_mediaHash).length > 0);
        require(_price > 0);

        // Update counter
        nftCount ++;

        // Create a NFT
        nfts[nftCount] = NFT(nftCount, _name, _description, _mediaHash, _price, msg.sender, msg.sender, 0, block.timestamp, _collection_id);

        // Trigger an event (Similar to return)
        emit NFTMinted(nftCount, _name, _description, _mediaHash, _price, msg.sender, msg.sender, 0, block.timestamp, _collection_id);
    }

    function purchaseNFT(uint _id) public payable {
        // Fetch NFT and owner
        NFT memory _nft = nfts[_id];

        // Validation
        require(_nft.id > 0 && _nft.id <= nftCount); // Id is valid
        require(msg.value >= _nft.price); // There is enough ETH in transation
        require(msg.sender != _nft.owner); // Buyer is not the owner

        uint commission = (msg.value * 25) / 1000; // 2.5% OpenSea service fee on each transaction
        uint royalty = (msg.value * 50) / 1000; // 5% royalty to original artist
        uint price = msg.value - (commission + royalty); // Actual sell price

        // Pay 2.5% service fee to OpenSea
        payable(address(this)).transfer(commission);

        // Pay 5% royalty to minter
        payable(_nft.minter).transfer(royalty);

        // Pay the remaining sell price to owner
        payable(_nft.owner).transfer(price);

        // Transfer ownership, volume and timestamp
        _nft.owner = msg.sender;
        _nft.volume_traded += 1;
        _nft.timestamp = block.timestamp;

        // Update the actual NFT in blockchain
        nfts[_id] = _nft;

        // Trigger an event
        emit NFTPurchased(_id, _nft.name, _nft.description, _nft.mediaHash, _nft.price, _nft.owner, msg.sender, _nft.volume_traded, block.timestamp, _nft.collection_id);
    }

    function createCollection(string memory _name, string memory _description, string memory _mediaHash, string memory _coverHash) public {
        // Validation
        require(bytes(_name).length > 0);

        // Update counter
        collectionCount ++;

        // Create a collection
        collections[collectionCount] = Collection(collectionCount, _name, _description, _mediaHash, _coverHash, msg.sender);

        // Trigger an event (Similar to return)
        emit CollectionCreated(collectionCount, _name, _description, _mediaHash,_coverHash, msg.sender);
    }
}



/*
Extra Notes:
    1) Why counter?
    Solidity doesn't tell us how many NFTs are in Struct. It returns empty vals if you've 5 prods and search for 6. 

    2) What is state/public variable?
    Using public converts vaiable into function which can be used globally including console. More like auto increment PK.

    3) Why to trigger event?
    In Laravel, we return some value in the function. In solidity, we can trigger an event which will be passed as an argument in the callback of this function.

    4) What is msg.sender?
    It's the address of the person who calls the function i.e the one who makes the purchase with his wallet. In this case, msg. values come from metadata (msg.sender = from: buyer). 

    5) What is require() in a function?
    The function will throw an exception and will stop the execution if the condition is not correct in order to save gas fee.

    6) Why _ on parameters?
    _ is just for naming convention to differentiate local variables from state variables. 

    7) What is NFT memory _nft?
    Creates a duplicate copy of the NFT that exists in the blockchain and assigns it to the local variable _nft. 

    8) What is payable?
    Solidity can't let you transfer money or use metadata(msg) value without payable function. The variable which contains owner address also must have payable.

    9) What happens ofter transfering the value?
    Check the Ganache network. The msg.sender/from: buyer (3rd account) will lose 1 eth and owner (2nd account) will gain one.   
*/

