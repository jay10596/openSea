import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import SectionHeader from '../reusables/SectionHeader';
import NoImage from '../../assets/NoImage.jpeg';

function CollectionList() {
    const openSea = useSelector((state) => state.openSea.store)
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <section>
            <SectionHeader heading="Featured Collections" />

            <Slider {...settings}>
                {openSea.collections.map((collection, key) => {
                    return (
                        <Link to={`/collections/${collection.id}`} key={key}>
                            <div>
                                {collection.mediaHash.length > 0 
                                    ? <img src={`https://ipfs.infura.io/ipfs/${collection.mediaHash}`} alt={collection.name} />
                                    : <img src={NoImage} alt={collection.name} />
                                }
                                <small>{collection.mediaHash}</small>
                                
                                {collection.name}
                                {collection.owner}
                            </div>
                        </Link>
                    )
                })}
            </Slider>
        </section>
    );
}

export default CollectionList;