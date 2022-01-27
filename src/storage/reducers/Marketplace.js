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
        setMarketplace: async (state, action) => {
            state.value = action.payload
            const markp = action.payload.marketplace
            const temp = await markp.methods.collectionCount().call()

            console.log(action.payload, temp)
        }
    }
})

export const { login, setAccount, setMarketplace } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;