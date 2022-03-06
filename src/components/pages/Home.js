import React from 'react';

import Banner from '../sections/Banner';
import CollectionForm from '../sections/CollectionForm';
import FeaturedCollections from '../sections/FeaturedCollections';
import NFTForm from '../sections/NFTForm';
import NFTList from '../sections/NFTList';

function Home() {
    return (
        <main>
            <Banner />

            <CollectionForm />

            <FeaturedCollections />

            <NFTForm />

            <NFTList />
        </main>
    );
}

export default Home;