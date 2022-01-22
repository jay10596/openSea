import React from 'react';

const Temp = (props) => {
    return (
        <div>
            <h1>Temp</h1>

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
        </div>
    );
}

export default Temp;
