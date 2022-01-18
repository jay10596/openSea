// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    // State variables
    string public name;
    uint public counter = 0; 

    // Equivalent to database
    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }

    // Similar to declaring PK for adding data
    mapping(uint => Product) public products;

    // Emit event when a product is created
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    constructor() {
        name = "Exotique Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        // Check for valid params
        require(bytes(_name).length > 0);
        require(_price > 0);

        // Update Counter
        counter ++;

        // Create a product
        products[counter] = Product(counter, _name, _price, msg.sender, false);

        // Trigger an event (Similar to return)
        emit ProductCreated(counter, _name, _price, msg.sender, false);
    }
}



/*
Extra Notes:
    1) Why counter?
    Solidity doesn't tell us how many products are in Struct. It returns empty vals if you've 5 prods and search for 6. 

    2) What is public variable?
    Using public converts vaiable into function which can be used globally including console. More like auto increment PK.

    3) Why to trigger event?
    In Laravel, we return some value in the function. In solidity, we can trigger an event which will be passed as an argument in the callback of this function.

    4) What is require() in a function?
    The function will throw an exception and will stop the execution if the condition is not correct in order to save gas fee.

    5) Why _ on parameters?
    _ is just for naming convention to differentiate local variables from state variables. 
*/

