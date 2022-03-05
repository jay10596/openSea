import { createSlice, current } from "@reduxjs/toolkit"

const openSeaSlice = createSlice({
    name: 'openSea',
    initialState: {
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
    },
    reducers: {
        setOpenSea: (state, action) => {
            return {
                ...state,
                user: action.payload.user,
                store: action.payload.store,
                loading: action.payload.loading
            }
        },
        createCollection: (state, action) => {
            state = current(state)

            state.loading = true

            state.store.contract.methods.createCollection(action.payload.name, action.payload.media)
                .send({ from: state.user.address })
                .on('receipt', (receipt) => {
                    state.loading = false
                })
        },
        mintNFT: (state, action) => {
            state.loading = true
            
            state.store.contract.methods.createProduct(action.payload.name, action.payload.media, action.payload.price, action.payload.collection_id)
                .send({ from: state.account })
                .on('receipt', (receipt) => {
                    state.loading = false
                })
        },
        purchaseNFT: (state, action) => {
            state.loading = true

            state.store.contract.methods.purchaseProduct(action.payload.id)
                .send({ from: state.account, value: action.payload.price })
                .on('receipt', (receipt) => {
                    state.loading = false
                })
        }
    }
})

export const { setOpenSea, createCollection, mintNFT, purchaseNFT } = openSeaSlice.actions;

export default openSeaSlice.reducer;