import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SectionHeader from '../reusables/SectionHeader';
import NoImage from '../../assets/NoImage.jpeg';

function CollectionList() {
    const marketplace = useSelector((state) => state.marketplace.value)

    return (
        <section>
            <SectionHeader heading="Featured Collections" />

            {marketplace.collections.map((collection, key) => {
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
        </section>
    );
}

export default CollectionList;