import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NFT() {
    const { id } = useParams() // Route parameter
    const store = useSelector((state) => state.openSea.store)

    return (
        <main>
            {id > store.nfts.length
                ? <Navigate to='/nfts'/>
                : <h1>{store.nfts[id - 1].name}</h1>
            }
        </main>
    );
}

export default NFT;
