import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/pages/Home';
import Collections from '../components/pages/Collections';
import Collection from '../components/pages/Collection';
import NFTs from '../components/pages/NFTs';
import NFT from '../components/pages/NFT';
import About from '../components/pages/About';
import Error from '../components/pages/Error';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />

            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<Collection />} />

            <Route path="/nfts" element={<NFTs />} />
            <Route path="/nft/:id" element={<NFT />} />

            <Route path="/about" element={<About />} />

            <Route path='*' element={<Error exact />} />
        </Routes>
    );
}

export default Router;
