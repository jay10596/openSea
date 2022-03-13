import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import NoImage from "../../assets/NoImage.jpeg";
import { GoVerified } from "react-icons/go";

const NFTCard = (props) => {
    return (
        <Link to={`/nfts/${props.nft.id}`}>
            <div className={`nft-card ${props.type === "default" ? "default" : "quick-buy"}`} >
                <img
                    src={props.nft.mediaHash.length > 0
                        ? `https://ipfs.infura.io/ipfs/${props.nft.mediaHash}`
                        : NoImage
                    }
                    className="nft-card_media"
                    alt={props.nft.name}
                />

                <img src={`https://ipfs.infura.io/ipfs/${props.nft.mediaHash}`} className="nft-card_logo" />

                {props.type === "default" 
                    ?   <div className="nft-card_content">
                            <p>
                                <b>{props.nft.name}</b>
                                <br />
                                by <span>{props.store.collections[props.nft.collection_id - 1].name} <GoVerified /></span> 
                            </p>

                            <p>Watch UFC 272 live on pay-per-view with ESPN for only $40 a month.</p>
                        </div>

                    :   <div className="nft-card_content">
                            <div className="content">
                                <small>{props.store.collections[props.nft.collection_id - 1].name}</small>
                                <small>Price</small>
                            </div>

                            <div className="content">
                                <small><b>{props.nft.name}</b></small>
                                <small><b>{props.nft.price}</b></small>
                            </div>

                            <div className="content content-bottom">
                                <small>Buy Now</small>
                                <small>20</small>
                            </div>
                        </div>
                }
            </div>
        </Link >
    );
}

export default NFTCard;