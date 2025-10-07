import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = true
            state.user = action.payload || null
        },
        setLoggedOut(state) {
            state.isAuthenticated = false
            state.user = null
        },
    },
})

export const { setAuthenticated, setLoggedOut } = authSlice.actions
export default authSlice.reducer


