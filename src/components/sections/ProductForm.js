import React, { useState, useContext } from 'react';
import { MarketplaceContext } from '../App';
import SectionHeader from '../reusables/SectionHeader';

function ProductForm() {
    const marketplace = useContext(MarketplaceContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [collection_id, setCollectionID] = useState('1');

    // Binding values
    const changeName = (e) => setName(e.target.value);
    const changePrice = (e) => setPrice(e.target.value.toString());
    const changeCollectionID = (e) => setCollectionID(e.target.value.toString());

    return (
        <section>
            <SectionHeader heading="Create a product" />

            <form onSubmit={() => marketplace.createProduct(name, window.web3.utils.toWei(price, 'Ether'), collection_id)}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={changeName} />
                </label>

                <label>
                    Price:
                    <input type="text" name="price" value={price} onChange={changePrice} />
                </label>

                <label>
                    Collection:

                    <select name="collection_id" onChange={changeCollectionID} value={collection_id}>
                        {marketplace.collections.map((collection, key) => {
                            return(
                                <option key={key} value={collection.id}>{collection.name}</option>
                            )
                        })}
                    </select>
                </label>

                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default ProductForm;