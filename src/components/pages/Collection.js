import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Collection() {
    const { id } = useParams() // Route parameter
    const marketplace = useSelector((state) => state.marketplace.value)

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
