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
                        {collection.name}
                        {collection.owner}
                    </div>
                )
            })}
        </section>
    );
}

export default CollectionList;