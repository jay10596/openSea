import { createSlice } from "@reduxjs/toolkit"

const marketplaceSlice = createSlice({
    name: 'marketplace',
    initialState: {
        value: {
            account: '',
            marketplace: [],
            productCount: 0,
            collectionCount: 0,
            products: [],
            collections: [],
            loading: true
        }
    },
    reducers: {
        setMarketplace: (state, action) => {
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
        createProduct: (state, action) => {
            state.value.loading = true

            state.value.marketplace.methods.createProduct(action.payload.name, action.payload.media, action.payload.price, action.payload.collection_id)
                .send({ from: state.value.account })
                .on('receipt', (receipt) => {
                    state.value.loading = false
                })
        },
        purchaseProduct: (state, action) => {
            state.value.loading = true

            state.value.marketplace.methods.purchaseProduct(action.payload.id)
                .send({ from: state.value.account, value: action.payload.price })
                .on('receipt', (receipt) => {
                    state.value.loading = false
                })
        }
    }
})

export const { setMarketplace, createCollection, createProduct, purchaseProduct } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;