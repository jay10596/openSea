import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Collection from './pages/Collection';
import Products from './pages/Products';
import Product from './pages/Product';
import About from './pages/About';
import Error from './pages/Error';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />

            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<Collection />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />

            <Route path="/about" element={<About />} />

            <Route path='*' element={<Error exact />} />
        </Routes>
    );
}

export default Router;
