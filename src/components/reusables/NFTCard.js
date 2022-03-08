import React from "react";
import { Link } from "react-router-dom";

import NoImage from "../../assets/NoImage.jpeg";
import { GoVerified } from "react-icons/go";

const NFTCard = (props) => {
    return (
        <Link to={`/nfts/${props.nft.id}`}>
            <div className="nft-card">
                <img
                    src={props.nft.mediaHash.length > 0
                        ? `https://ipfs.infura.io/ipfs/${props.nft.mediaHash}`
                        : NoImage
                    }
                    className="nft-card_media"
                    alt={props.nft.name}
                />

                <img src={`https://ipfs.infura.io/ipfs/${props.nft.mediaHash}`} className="nft-card_logo" />

                <div className="nft-card_content">
                    <p>
                        <b>{props.nft.name}</b>
                        <br />
                        by <span>ABCD <GoVerified /></span> 
                    </p>
                    <p>Watch UFC 272 live on pay-per-view with ESPN for only $40 a month.</p>
                </div>
            </div>
        </Link >
    );
}

export default NFTCard;