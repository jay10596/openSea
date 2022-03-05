import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NFT() {
    const { id } = useParams() // Route parameter
    const marketplace = useSelector((state) => state.marketplace.value)

    return (
        <main>
            {id > marketplace.products.length
                ? <Navigate to='/products'/>
                : <h1>{marketplace.products[id - 1].name}</h1>
            }
        </main>
    );
}

export default NFT;
