import React from 'react';

import Banner from '../sections/Banner';
import CollectionForm from '../sections/CollectionForm';
import CollectionList from '../sections/CollectionList';
import ProductForm from '../sections/NFTForm';
import ProductList from '../sections/NFTList';

function Home() {
    return (
        <main>
            <Banner />

            <CollectionForm />

            <CollectionList />

            <ProductForm />

            <ProductList />
        </main>
    );
}

export default Home;