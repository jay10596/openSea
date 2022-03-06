import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Slider from "react-slick";

import SectionHeader from '../reusables/SectionHeader';
import CollectionCard from '../reusables/CollectionCard';

function FeaturedCollections() {
    const store = useSelector((state) => state.openSea.store)
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    }

    return (
        <Container>
            <section>
                <SectionHeader heading="Notable" highlight="Drops" />

                <Slider {...settings}>
                    {store.collections.map((collection, key) => {
                        return (
                            <CollectionCard collection={collection} key={key} />
                        )
                    })}
                </Slider>
            </section>
        </Container>
    );
}

export default FeaturedCollections;