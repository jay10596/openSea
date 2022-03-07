import React from "react";
import { Link } from "react-router-dom";

import NoImage from "../../assets/NoImage.jpeg";

const CollectionCard = (props) => {
    return (
        <Link to={`/collections/${props.collection.id}`}>
            <div className="collection-card">
                <img
                    src={props.collection.mediaHash.length > 0
                        ? `https://ipfs.infura.io/ipfs/${props.collection.mediaHash}`
                        : NoImage
                    }
                    alt={props.collection.name}
                />

                <div className="collection-card_content text-white">
                    <h6>{props.collection.name}</h6>
                    <p>Watch UFC 272 live on pay-per-view with ESPN for only $40 a month.</p>
                </div>
            </div>
        </Link >
    );
}

export default CollectionCard;