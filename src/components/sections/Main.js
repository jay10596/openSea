import React, { useState } from 'react';

const Main = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    // Binding values
    const changeName = (e) => setName(e.target.value);
    const changePrice = (e) => setPrice(e.target.value.toString());

    return (
        <main>
            <h1>Add Product</h1>

            <form onSubmit={() => props.createProduct(name, window.web3.utils.toWei(price, 'Ether'))}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={changeName} />
                </label>

                <label>
                    Price:
                    <input type="text" name="price" value={price} onChange={changePrice} />
                </label>

                <input type="submit" value="Submit" />
            </form>

            <h1>Products List</h1>

            <ul>
                {props.products.map((product, key) => {
                    return(
                        <li key={key}>
                            {product.name}
                            {window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH
                            {product.owner}
                            {!product.purchased 
                                ? <button onClick={() => props.purchaseProduct(product.id, product.price)}>Buy</button>
                                : null
                            }
                            
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}

export default Main;
