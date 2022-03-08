import React from 'react';

import Banner from '../sections/Banner';
import CollectionForm from '../sections/CollectionForm';
import FeaturedCollections from '../sections/FeaturedCollections';
import NFTForm from '../sections/NFTForm';
import FeaturedNFTs from '../sections/FeaturedNFTs';

function Home() {
    return (
        <main>
            <Banner />

            <CollectionForm />

            <FeaturedCollections />

            <NFTForm />

            <FeaturedNFTs />
        </main>
    );
}

export default Home;