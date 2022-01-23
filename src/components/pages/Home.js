import React from 'react';
import Banner from '../sections/Banner';
import CollectionForm from '../sections/CollectionForm';
import ProductForm from '../sections/ProductForm';
import ProductList from '../sections/ProductList';

function Home() {
    return (
        <main>
            <Banner />

            <CollectionForm />

            <ProductForm />

            <ProductList />
        </main>
    );
}

export default Home;
