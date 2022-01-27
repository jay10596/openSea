import React from 'react';

import Login from '../sections/Login';
import Banner from '../sections/Banner';
import CollectionForm from '../sections/CollectionForm';
import CollectionList from '../sections/CollectionList';
import ProductForm from '../sections/ProductForm';
import ProductList from '../sections/ProductList';

function Home() {
    return (
        <main>
            <Login />
            <Banner />
{/* 
            <CollectionForm />

            <CollectionList />

            <ProductForm />

            <ProductList /> */}
        </main>
    );
}

export default Home;