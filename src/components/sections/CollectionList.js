import React, { useContext } from 'react';
import { MarketplaceContext } from '../App';
import SectionHeader from '../reusables/SectionHeader';

function CollectionList() {
    const marketplace = useContext(MarketplaceContext);

    return (
        <section>
            <SectionHeader heading="Featured Collections" />

            {marketplace.collections.map((collection, key) => {
                return(
                    <div key={key}>
                        <img src={collection.media} alt={collection.name} />

                        {collection.name}
                        {collection.owner}
                    </div>
                )
            })}
        </section>
    );
}

export default CollectionList;