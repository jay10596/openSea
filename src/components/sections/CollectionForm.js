import React, { useState, useContext } from 'react';
import { MarketplaceContext } from '../App';
import { create } from 'ipfs-http-client'

import SectionHeader from '../reusables/SectionHeader';
import NoImage from '../../assets/NoImage.jpeg';

function CollectionForm() {
    const marketplace = useContext(MarketplaceContext)

    const [name, setName] = useState('')
    const [media, setMedia] = useState()

    // Binding values
    const updateName = (e) => setName(e.target.value)
    const updateMedia = (e) => setMedia(e.target.files[0])

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault()

        let client, uploadedMedia

        // Upload media on IPFS and get Hash
        client = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
        media == null ? uploadedMedia = await client.add(NoImage) : uploadedMedia = await client.add(media)

        marketplace.createCollection(name, uploadedMedia.path)
    }

    return (
        <section>
            <SectionHeader heading="Create a collection" />

            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={updateName} />
                </label>

                <label>
                    File Upload:
                    <input type="file" name="media" onChange={updateMedia} />
                </label>

                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default CollectionForm;