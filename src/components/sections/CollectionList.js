import React, { useContext } from 'react';
import { MarketplaceContext } from '../App';

import SectionHeader from '../reusables/SectionHeader';
import NoImage from '../../assets/NoImage.jpeg';

function CollectionList() {
    const marketplace = useContext(MarketplaceContext);

    return (
        <section>
            <SectionHeader heading="Featured Collections" />

            {marketplace.collections.map((collection, key) => {
                return (
                    <div key={key}>
                        {collection.mediaHash.length > 0 
                            ? <img src={`https://ipfs.infura.io/ipfs/${collection.mediaHash}`} alt={collection.name} />
                            : <img src={NoImage} alt={collection.name} />
                        }
                        
                        {collection.name}
                        {collection.owner}
                    </div>
                )
            })}
        </section>
    );
}

export default CollectionList;