import React, { useState, useContext } from 'react';
import { MarketplaceContext } from '../App';
import SectionHeader from '../reusables/SectionHeader';

function CollectionForm() {
    const marketplace = useContext(MarketplaceContext);

    const [name, setName] = useState('');

    // Binding values
    const changeName = (e) => setName(e.target.value);

    return (
        <section>
            <SectionHeader heading="Create a collection" />

            <form onSubmit={() => marketplace.createCollection(name)}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={changeName} />
                </label>

                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default CollectionForm;