import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Slider from "react-slick";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SectionHeader from "../reusables/SectionHeader";
import NFTCard from "../reusables/NFTCard";

function FeaturedNFTs() {
    const store = useSelector((state) => state.openSea.store)
    const settings = {
        dots: true,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <IoIosArrowBack size="2rem" />,
        nextArrow: <IoIosArrowForward size="2rem" />,
        dotsClass: "slick-dots dot"
    }

    return (
        <section className="featured-nfts">
            <Container>
                <SectionHeader heading="Latest" highlight="NFTS" />

                <Slider {...settings}>
                    {store.nfts.map((nft, key) => {
                        return (
                            <div key={key}>
                                <NFTCard nft={nft} />
                            </div>
                        )
                    })}
                </Slider>
            </Container>
        </section>
    );
}

export default FeaturedNFTs;