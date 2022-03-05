import { createSlice } from "@reduxjs/toolkit"

const openSeaSlice = createSlice({
    name: 'openSea',
    initialState: {
        value: {
            user: {
                address: null,
                eth: 0,
            },
            store: {
                contract: null,
                address: null,
                eth: 0,
                nfts: [],
                collections: []
            },
            loading: false
        }
    },
    reducers: {
        setOpenSea: (state, action) => {
            state.value = action.payload
        },
        createCollection: (state, action) => {
            state.value.loading = true

            state.value.marketplace.methods.createCollection(action.payload.name, action.payload.media)
                .send({ from: state.value.account })
                .on('receipt', (receipt) => {
                    state.value.loading = false
                })
        },
        mintNFT: (state, action) => {
            state.value.loading = true

            state.value.marketplace.methods.createProduct(action.payload.name, action.payload.media, action.payload.price, action.payload.collection_id)
                .send({ from: state.value.account })
                .on('receipt', (receipt) => {
                    state.value.loading = false
                })
        },
        purchaseNFT: (state, action) => {
            state.value.loading = true

            state.value.marketplace.methods.purchaseProduct(action.payload.id)
                .send({ from: state.value.account, value: action.payload.price })
                .on('receipt', (receipt) => {
                    state.value.loading = false
                })
        }
    }
})

export const { setOpenSea, createCollection, mintNFT, purchaseNFT } = openSeaSlice.actions;

export default openSeaSlice.reducer;