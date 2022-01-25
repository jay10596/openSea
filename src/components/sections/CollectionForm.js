import React, { useState, useContext } from 'react';
import { MarketplaceContext } from '../App';
import { create } from 'ipfs-http-client'

import SectionHeader from '../reusables/SectionHeader';
// import CollectionDefault from '../../assets/BoredApeYatchClub.png';

function CollectionForm() {
    const marketplace = useContext(MarketplaceContext)

    const [name, setName] = useState('')
    const [media, setMedia] = useState()

    // Binding values
    const changeName = (e) => setName(e.target.value)
    const changeMedia = (e) => setMedia(e.target.files[0])
    
    // Upload media on IPFS
    const uploadMedia = async (e) => {
        const client = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
        const file = await client.add(media)

        fetch(`https://ipfs.infura.io/ipfs/${file.path}`)
            .then(res => {
                console.log(res.url) 
                setMedia(res.url)
                console.log(media)
            })
            .catch(err => console.log(err)) 
    }

    return (
        <section>
            <SectionHeader heading="Create a collection" />

            <form onSubmit={(e) => {
                e.preventDefault()
                uploadMedia()
                // marketplace.createCollection(name, media)
            }}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={changeName} />
                </label>

                <label>
                    File Upload:
                    <input type="file" name="media" onChange={changeMedia} />
                </label>

                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default CollectionForm;