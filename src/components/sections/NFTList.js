import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseNFT } from '../../helpers/reducers/OpenSea';
import { Link } from 'react-router-dom';

import SectionHeader from '../reusables/SectionHeader';
import NoImage from '../../assets/NoImage.jpeg';

function NFTList() {
    const dispatch = useDispatch()
    const store = useSelector((state) => state.openSea.store)

    return (
        <section>
            <SectionHeader heading="Featured nfts" />

            {store.nfts.map((nft, key) => {
                return (
                    <Link to={`/nfts/${nft.id}`} key={key}>
                        <div>
                            {nft.mediaHash.length > 0 
                                ? <img src={`https://ipfs.infura.io/ipfs/${nft.mediaHash}`} alt={nft.name} />
                                : <img src={NoImage} alt={nft.name} />
                            }

                            {nft.name}
                            {window.web3.utils.fromWei(nft.price.toString(), 'Ether')} ETH
                            {nft.owner}
                            {store.collections[nft.collection_id - 1].name}

                            <button onClick={() => dispatch(purchaseNFT({id: nft.id, price: nft.price}))}>Buy</button>
                        </div>
                    </Link>
                )
            })}
        </section>
    );
}

export default NFTList;