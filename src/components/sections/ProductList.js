import React, { useContext } from 'react';
import { MarketplaceContext } from '../App';
import SectionHeader from '../reusables/SectionHeader';

function ProductList() {
    const marketplace = useContext(MarketplaceContext);

    return (
        <section>
            <SectionHeader heading="Featured Products" />

            {marketplace.products.map((product, key) => {
                return(
                    <div key={key}>
                        <img src={product.media} alt={product.name} />

                        {product.name}
                        {window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH
                        {product.owner}
                        {product.purchased
                            ? null
                            : <button onClick={() => marketplace.purchaseProduct(product.id, product.price)}>Buy</button>
                        }

                        {marketplace.collections.map((collection, key) => {
                            return(
                                collection.id === product.collection_id ? collection.name : null
                            )
                        })}
                    </div>
                )
            })}
        </section>
    );
}

export default ProductList;