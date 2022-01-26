import React, { useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MarketplaceContext } from '../App';

function Collection() {
    const { id } = useParams()
    const marketplace = useContext(MarketplaceContext)

    return (
        <main>
            {id > marketplace.collections.length
                ? <Navigate to='/collections'/>
                : <h1>{marketplace.collections[id - 1].name}</h1>
            }
        </main>
    );
}

export default Collection;
