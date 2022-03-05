import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCollection } from '../../helpers/reducers/OpenSea'
import { create } from 'ipfs-http-client'

import SectionHeader from '../reusables/SectionHeader';

function CollectionForm() {
    const dispatch = useDispatch()

    // State variables
    const [name, setName] = useState('')
    const [media, setMedia] = useState()

    // Bind values
    const updateName = (e) => setName(e.target.value)
    const updateMedia = (e) => setMedia(e.target.files[0])

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Upload media on IPFS and get Hash
        const client = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
        const uploadedMedia = media == null ? null : await client.add(media)
        
        dispatch(createCollection({name: name, media: uploadedMedia ? uploadedMedia.path : ''}))
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