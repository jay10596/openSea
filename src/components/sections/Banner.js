import React from 'react';
import { useSelector } from 'react-redux';

function Banner() {
    const marketplace = useSelector((state) => state.marketplace.value)

    console.log('asdasd',marketplace.account)
    return (
        <div>{marketplace.account}
        </div>
    );
}

export default Banner;