import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
    name: 'userData',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
    },
});

export const { setUser } = userData.actions;
