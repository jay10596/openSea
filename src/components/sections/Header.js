import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            {props.account}
            <Link to="/collections">collections</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
        </header>
    );
}

export default Header;