import React from 'react';
import { Link } from 'react-router-dom';

import NoImage from '../../assets/NoImage.jpeg';

const CollectionCard = (props) => {
    return (
        <div className="collection-card">
            <Link to={`/collections/${props.collection.id}`} key={props.key}>
                {props.collection.mediaHash.length > 0 
                    ? <img src={`https://ipfs.infura.io/ipfs/${props.collection.mediaHash}`} alt={props.collection.name} />
                    : <img src={NoImage} alt={props.collection.name} />
                }
                <small>{props.collection.mediaHash}</small>
                
                {props.collection.name}
                {props.collection.owner}
            </Link>
        </div>
    );
}

export default CollectionCard;