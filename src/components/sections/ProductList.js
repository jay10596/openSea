import React, { useContext } from 'react';
import { MarketplaceContext } from '../App';

import SectionHeader from '../reusables/SectionHeader';
import NoImage from '../../assets/NoImage.jpeg';

function ProductList() {
    const marketplace = useContext(MarketplaceContext);

    return (
        <section>
            <SectionHeader heading="Featured Products" />

            {marketplace.products.map((product, key) => {
                return (
                    <div key={key}>
                        {product.mediaHash.length > 0 
                            ? <img src={`https://ipfs.infura.io/ipfs/${product.mediaHash}`} alt={product.name} />
                            : <img src={NoImage} alt={product.name} />
                        }

                        {product.name}
                        {window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH
                        {product.owner}
                        {product.purchased
                            ? null
                            : <button onClick={() => marketplace.purchaseProduct(product.id, product.price)}>Buy</button>
                        }

                        {marketplace.collections[product.collection_id].name}
                    </div>
                )
            })}
        </section>
    );
}

export default ProductList;