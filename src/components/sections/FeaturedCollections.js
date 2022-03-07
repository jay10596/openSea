import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Slider from "react-slick";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SectionHeader from "../reusables/SectionHeader";
import CollectionCard from "../reusables/CollectionCard";

function FeaturedCollections() {
    const store = useSelector((state) => state.openSea.store)
    const settings = {
        dots: true,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <IoIosArrowBack size="2rem" />,
        nextArrow: <IoIosArrowForward size="2rem" />,
    }

    return (
        <Container>
            <section className="featured-collections">
                <SectionHeader heading="Notable" highlight="Drops" />

                <Slider {...settings}>
                    {store.collections.map((collection, key) => {
                        return (
                            <div key={key}>                   
                                <CollectionCard collection={collection} />
                            </div>
                        )
                    })}
                </Slider>
            </section>
        </Container>
    );
}

export default FeaturedCollections;