import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mintNFT } from "../../helpers/reducers/OpenSea";
import { create } from "ipfs-http-client";

import SectionHeader from "../reusables/SectionHeader";

function NFTForm() {
    const dispatch = useDispatch()
    const openSea = useSelector((state) => state.openSea.store)

    // State variables
    const [name, setName] = useState("")
    const [media, setMedia] = useState()
    const [price, setPrice] = useState("")
    const [collection_id, setCollectionID] = useState("1")

    // Bind values
    const updateName = (e) => setName(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value.toString())
    const updateMedia = (e) => setMedia(e.target.files[0])
    const updateCollectionID = (e) => setCollectionID(e.target.value.toString())

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Upload media on IPFS and get Hash
        const client = create({ host: "ipfs.infura.io", port: "5001", protocol: "https" })
        const uploadedMedia = await client.add(media)

        dispatch(mintNFT({name: name, media: uploadedMedia.path, price: window.web3.utils.toWei(price, "Ether"), collection_id: collection_id}))
    }

    return (
        <section data-aos="fade-up">
            <SectionHeader heading="Mint an NFT" />

            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={updateName} />
                </label>

                <label>
                    Price:
                    <input type="text" name="price" value={price} onChange={updatePrice} />
                </label>

                <label>
                    File Upload:
                    <input type="file" name="media" onChange={updateMedia} required />
                </label>

                <label>
                    Collection:

                    <select name="collection_id" onChange={updateCollectionID} value={collection_id}>
                        {openSea.collections.map((collection, key) => {
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

export default NFTForm;