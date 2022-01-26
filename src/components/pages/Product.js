import React, { useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MarketplaceContext } from '../App';

function Product() {
    const { id } = useParams()
    const marketplace = useContext(MarketplaceContext)

    return (
        <main>
            {id > marketplace.products.length
                ? <Navigate to='/products'/>
                : <h1>{marketplace.products[id - 1].name}</h1>
            }
        </main>
    );
}

export default Product;
